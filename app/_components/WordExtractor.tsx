'use client'

import React from 'react';
import mammoth from 'mammoth';
import launchWordSentiments from '@/utils/launchWordSentiments';
import { useState } from 'react';

import mergeContiguousSimilarEmotions from '@/utils/mergeContigous';
import ReportComponent from './wordReport';
const cleanText = (text: string): string => {
    // Reduce multiple line breaks to two
    text = text.replace(/(\r\n|\r|\n){2,}/g, '\n');
    // Remove additional white spaces at the beginning and end of each line
    text = text.split('\n').map(line => line.trim()).join('\n');
    return text;
}
const DocxReader: React.FC = () => {
    const [data, setData] = useState(null);
    const [extText, setExtText] = useState(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            mammoth.extractRawText({ arrayBuffer })
                .then(result => {
                    console.log(cleanText(result.value)); // Mostra el text extret en el console log
                    const txt=cleanText(result.value)
                    setExtText(txt);
                    const textToPass = cleanText(result.value);
                    launchWordSentiments(textToPass).then((res) => {
                        console.log('log al final::',res.analizeSentiments);
                        setData(mergeContiguousSimilarEmotions(res.analizeSentiments));
                    });
                })
                .catch(err => {
                    console.error(err);
                    console.log("Error en llegir l'arxiu");
                });
        }
    };

    return (
        <>
            <div className=" flex justify-start items-center flex-col m-6">
                <input type="file" onChange={handleFileChange} accept=".docx" className="block" />
                {(extText && !data) && <><h1 className="text-3xl mt-6">TEXTO EXTRAIDO</h1><div className="my-6 px-[30px]"> {extText}</div></>}
            {data && <ReportComponent data={data} />}
            </div>
        </>
    );
};

export default DocxReader;
