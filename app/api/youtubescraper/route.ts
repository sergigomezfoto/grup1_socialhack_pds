import { createCondensedSubtitleString } from '@/utils/youtubeLoader';
import { NextResponse } from 'next/server';
import { getSubtitles } from 'youtube-caption-extractor';


export async function POST(req: Request) {
    const { videoId} = await req.json();

    const languages = ['es', 'en', 'ca'];
    async function getSubtitlesWithFallback(videoID: string, languages: string[]): Promise<any> {
        console.log('estic dintre de la api');
        for (const lang of languages) {
            const subtitles = await getSubtitles({ videoID, lang });
            if (subtitles.length > 0) {
                // console.log(subtitles);
                console.log(createCondensedSubtitleString(subtitles))
                return subtitles; 
            }
        }
        return []; // Retorna un array buit si cap idioma funciona
    }
    const subtitles = await getSubtitlesWithFallback(videoId, languages);
    return NextResponse.json({ message:'ei!!!!'});
}