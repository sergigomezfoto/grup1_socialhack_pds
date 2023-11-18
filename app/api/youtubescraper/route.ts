import { NextResponse } from 'next/server';
import { getSubtitles } from 'youtube-caption-extractor';


export async function POST(req: Request) {
    const { history, userInput, resource } = await req.json();

    const languages = ['es', 'en', 'ca'];
    async function getSubtitlesWithFallback(videoID: string, languages: string[]): Promise<any> {
        for (const lang of languages) {
            const subtitles = await getSubtitles({ videoID, lang });
            if (subtitles.length > 0) {
                return subtitles; 
            }
        }
        return []; // Retorna un array buit si cap idioma funciona
    }
    const subtitles = await getSubtitlesWithFallback(resource, languages);
    return NextResponse.json({ message:subtitles});
}