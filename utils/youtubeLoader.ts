import { log } from 'console';

import { Document } from "langchain/document";



export const extractYouTubeVideoID =(url: string): string =>{
    // Comprova si l'URL és vàlida
    if (!url) return 'fail';
  
    // Expressió regular per a les dues formes de URLs de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    if (match && match[2].length === 11) {
      // Retorna l'ID del vídeo
      return match[2];
    } else {
      // Retorna null si l'ID del vídeo no es pot extreure
      return 'fail';
    }
  }

  interface Subtitle {
    start: string;
    dur: string;
    text: string;
  }
  
  export function createCondensedSubtitleString(subtitles: Subtitle[]): string {
    const step = Math.ceil(subtitles.length / 16); // Determina cada quants elements agafar un start
    let condensedText = '';
    let nextIndex = 0;
  
    for (let i = 0; i < subtitles.length; i++) {
      if (i === nextIndex) {
        condensedText += `[${subtitles[i].start}]`;
        nextIndex += step;
      }
      condensedText += subtitles[i].text + ' ';
    }
  
    return condensedText.trim();
  }
  export function createObjectsFromTimedText(text: string) {
    const regex = /\[(\d+\.\d+)\](.*?)(?=\[\d+\.\d+\]|$)/gs;
    const parts = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const temps = parseFloat(match[1]);
        const contingut = match[2].trim();

        const doc = new Document({
            pageContent: contingut,
            metadata: { time: temps }
        });

        parts.push(doc);
    }

    return parts;
  }