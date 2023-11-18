const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const axios = require('axios');

const apiKey = "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";
const inputVideoPath = 'videos/12.mp4';
const outputAudioPath = 'audios/12.mp3';

function convertVideoToAudio(inputVideoPath, outputAudioPath, callback) {
  ffmpeg()
    .input(inputVideoPath)
    .audioCodec('libmp3lame')
    .audioBitrate(192)
    .on('end', () => {
      console.log('Conversion finished');
      callback(null);
    })
    .on('error', (err) => {
      console.error('Error:', err);
      callback(err);
    })
    .save(outputAudioPath);
}

function transcribe(file) {
  return axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      file,
      model: 'whisper-1'
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${apiKey}`
      }
    }
  )
  .then(response => response.data.text);
}

function totext() {
  const file = fs.createReadStream(outputAudioPath);

  transcribe(file)
    .then(transcript => {
      console.log(transcript);
    })
    .catch(error => {
      console.error('Error transcribing audio:', error);
    });
}

convertVideoToAudio(inputVideoPath, outputAudioPath, (err) => {
  if (err) {
    console.error('Error converting video to audio:', err);
  } else {
    console.log('Audio extraction successful');
    totext();
  }
});
