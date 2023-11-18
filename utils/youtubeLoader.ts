import { log } from 'console';

import { Document } from "langchain/document";



export const extractYouTubeVideoID = (url: string): string => {
  // Comprova si l'URL és vàlida
  console.log(url);
  if (!url) return 'fail';

  // Expressió regular per a les dues formes de URLs de YouTube
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match) {
    // Comprova si l'URL és una URL de YouTube Shorts
    if (url.includes('shorts/')) {
      // Per a YouTube Shorts, retorna directament l'ID sense comprovar la longitud
      return match[2];
    } else if (match[2].length === 11) {
      // Retorna l'ID del vídeo per a URLs no Shorts
      return match[2];
    }
  }





  // Retorna 'fail' si l'ID del vídeo no es pot extreure
  return 'fail';
}

interface Subtitle {
  start: string;
  dur: string;
  text: string;
}


export const scrapeYoutubeSubtitles = async (videoId: string) => {

  const response = await fetch('api/youtubescraper', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
});
const res = await response.json();
// console.log(res.message);

return `data:audio/mpeg;base64,${res.message}`;


}



// export function createCondensedSubtitleString(subtitles: Subtitle[]): string {
//   const step = Math.ceil(subtitles.length / 16); // Determina cada quants elements agafar un start
//   let condensedText = '';
//   let nextIndex = 0;

//   for (let i = 0; i < subtitles.length; i++) {
//     if (i === nextIndex) {
//       condensedText += `[${subtitles[i].start}]`;
//       nextIndex += step;
//     }
//     condensedText += subtitles[i].text + ' ';
//   }

//   return condensedText.trim();
// }
export function createCondensedSubtitleString(subtitles: Subtitle[]): string {
  let condensedText = '';

  for (let i = 0; i < subtitles.length; i++) {
    condensedText += `${subtitles[i].text} `;
  }

  return condensedText.trim();
}
// export function createObjectsFromTimedText(text: string) {
//   const regex = /\[(\d+\.\d+)\](.*?)(?=\[\d+\.\d+\]|$)/gs;
//   const parts = [];
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//       const temps = parseFloat(match[1]);
//       const contingut = match[2].trim();

//       const doc = new Document({
//           pageContent: contingut,
//           metadata: { time: temps }
//       });

//       parts.push(doc);
//   }

//   return parts;
// }