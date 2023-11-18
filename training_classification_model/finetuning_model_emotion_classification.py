# -*- coding: utf-8 -*-

!pip install datasets
!pip install transformers[torch]

import torch
import pandas as pd
from datasets import Dataset, DatasetDict
import datasets
from tqdm import tqdm, trange

import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

from transformers import DataCollatorWithPadding

from transformers import TrainingArguments, Trainer

import torch, gc
import os

# evaluation metrics
from sklearn.metrics import f1_score, roc_auc_score, accuracy_score
from transformers import EvalPrediction
import torch
from sklearn.metrics import classification_report
from transformers import EarlyStoppingCallback

import pandas as pd
from google.colab import drive


def preprocess_function(examples, tokenizer, max_length = 250):
    return tokenizer(examples["text"], truncation=True, max_length = max_length)

def compute_metrics(p: EvalPrediction):

    preds = p.predictions[0] if isinstance(p.predictions,
            tuple) else p.predictions

    y_pred = np.argmax(preds, axis=-1)
    y_true = p.label_ids

    f1_micro_average = f1_score(y_true=y_true, y_pred=y_pred, average='micro')
    accuracy = accuracy_score(y_true, y_pred)
    # return as dictionary
    metrics = {'f1': f1_micro_average,
               'accuracy': accuracy}

    return metrics

data = pd.read_csv('dataset_emotions.csv')
data = data.rename(columns = {'sentence':'text'})

labels = list(data.emotion.unique())

id2label = {i:emotion for i, emotion in enumerate(labels)}
label2id = {emotion:i for i, emotion in id2label.items()}


data['label'] = data.emotion.apply(lambda _ : label2id[_])

train=data.sample(frac=0.8,random_state=200)
test=data.drop(train.index)

train_ds = Dataset.from_pandas(train.set_index('text'))
test_ds = Dataset.from_pandas(test.set_index('text'))

batracio_dd = datasets.DatasetDict({"train":train_ds, "test":test_ds})

model_name = 'PlanTL-GOB-ES/roberta-base-bne'
max_length =  512

tokenizer = AutoTokenizer.from_pretrained(model_name)

# tokenize dataset
tokenized_dataset = batracio_dd.map(lambda x: preprocess_function(x, tokenizer=tokenizer, max_length = max_length), batched=True)
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=len(id2label), label2id=label2id, id2label=id2label)

# move to cuda
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)

# train
training_args = TrainingArguments(
    output_dir="./results",
    learning_rate=2e-5,
    evaluation_strategy = "epoch",
    save_strategy = "epoch",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=4,
    load_best_model_at_end=True,
    weight_decay=0.01,
    metric_for_best_model='f1'
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["test"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
    )

trainer.train()

trainer.save_model('/content/gdrive/MyDrive/go-emotion')

model_trained = trainer.model

from transformers import pipeline

classifier = pipeline("text-classification", model=model_trained, tokenizer=tokenizer, device=0)

text = 'Quiero matar a alguien.'
classifier(text)
