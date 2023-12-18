import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server';
import emotionalStates from './_emotionalStates_defs.js'
import { Document } from "langchain/document";



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })


export const maxDuration = 60

export async function POST(req: Request) {

    const { word } = await req.json();

    //   1 DIVIDIR EN EMOCIONS EL TEXT I OBTENIR UN OBJECTE ///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let finalReport = { report: '', alarm: null };
    const getEmotionSegments = async (text) => {

        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {   //PROMPT AI
                    role: "system",
                    content: `You are very reputed and espert psicologist, that can analyze and split a text by emotional transitions, avoiding segmenting based on grammatical indicators like commas or periods. You can also detect if the text denotes any alarm that indicates emotional disorders. Please divide the following text into segments based on changes in emotion. Use the format "segment || segment || segment" to indicate the importance of each segment, and separate multiple segments with "||".(Avoid segmenting based on grammatical indicators like commas or periods; prioritize emotional transitions instead). Think about which emotion is the dominant one for the entire text and evaluate each segment based on how well it represents that emotion.At the end of the text, add: *** very brief emotional summary of the text as a whole, not segmented. Include in ths emotional summary is si there any alarm in terms of emotional disorder. If you consider that there is any alarm follow the 'EXAMPLE (with alarms)' and divide the summary like this: summary|ALARM|alarms (write explicity '|A|' to split the summary). otherwhise follow the 'EXAMPLE (without alarms)', and don't divide the summary.
                    
                    EXAMPLE (without alarms): user: I'm feeling very sad today, my friend is ill... but I'm going to the beach with my friends. I'm so excited! And Mary will come too,Im in love with her!
                    system: I'm feeling very sad today, my friend is ill...||but I'm going to the beach with my friends.I'm so excited!||And Mary will come too,Im in love with her! *** The text conveys joy and well-being. There are no notable alarms.

                    EXAMPLE (with alarms): user: I'm feeling very sad today, my friend is ill... I love him a lot... life is so hard that I can't take it anymore, and I will kill somebody!
                    system: I'm feeling very sad today, my friend is ill...|| I love him a lot...||life is so hard that I can't take it anymore! *** The text denotes a lot of sadness due to a friend's illness. |A| Depression and risks to integrity.
                    
                    IMPORTANT: Consider as an alarm any expression that may signify harm to oneself or others, whether physically or emotionally. Your messge MUST BE in SPANISH.
                    `,
                },
                {
                    role: "user",
                    content: `${text}`,
                },
            ],
            temperature: 0,
        });
        let content = response.choices[0].message.content;
        console.log(content);
        // OBTENCIO i DEPURACIO DEL L'OBJECTE
        const [mainContent, globalReport] = content.split('***');
        content = mainContent;
        if (globalReport.includes('|A|')) {
            const parts = globalReport.split('|A|');
            finalReport.report = parts[0].trim();
            finalReport.alarm = parts[1].trim();
        } else {
            finalReport.report = globalReport.trim();
            finalReport.alarm = null;
        }
        console.log('content: ', content);
        const segments = content.split("||").map((segment) => {
            return { segment: segment.trim() };
        });
        return segments;
    };

    //   2.-COMFRONTACIÓ SEGMENTS OBJECTE EMOCIONS ( CERCA SEMÀNTICA )///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    const preprocessText = text => text.toLowerCase().replace(/[^\w\s]/gi, '');

    const findEmotionsInText = async (segmentObj) => {
        const preprocessedText = preprocessText(segmentObj.segment);
        const emotionalResults = await search(preprocessedText); //
        let emotionsObject = {};
        emotionalResults.forEach(result => {
            // Separem el contingut de la pàgina en el títol i la descripció
            const [titleLine, ...descriptionLines] = result[0].pageContent.split('\n');
            // Extraurem el títol netejant la cadena de text
            const title = titleLine.replace('Title: ', '').trim().toLowerCase();
            // Unim les línies de la descripció en una sola cadena de text
            const description = descriptionLines.join(' ').trim();
            emotionsObject = {
                segment: segmentObj.segment,
                emotion: {
                    title,
                    description
                },
                score: result[1] * 1
                // segmentObj.importance
            };

        });
        console.log('emotions:', emotionsObject);
        return emotionsObject;
    };
    const createStore = async () =>
        MemoryVectorStore.fromDocuments(
            emotionalStates.map(
                (emotion) =>
                    new Document({
                        pageContent: `Title: ${emotion.title}\n${emotion.description}`,
                        metadata: { source: emotion.id, title: emotion.title },
                    })
            ),
            new OpenAIEmbeddings()
        );

    const store = await createStore();

    const search = async (query, count = 2, delta = 0.006) => {
        const results = await store.similaritySearchWithScore(query, count);
        const sortedResults = results.sort((a, b) => b[1] - a[1]);
        const mostSimilar = sortedResults[0];
        const filteredResults = sortedResults.filter(result => {
            if (result[0] === mostSimilar[0]) return true;
            const difference = Math.abs(mostSimilar[1] - result[1]);
            return difference <= delta;
        });

        return filteredResults;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // TRIGGER GENERAL

    const analyzeTextEmotions = async () => {
        console.log("Analyzing text emotions...", word);
        const segments = await getEmotionSegments(word);
        const segmentEmotions = await Promise.all(segments.map(segment => findEmotionsInText(segment)));
        const response = {
            segments: segmentEmotions,
            finalReport: finalReport
        }
        return response
    };

    const res = await analyzeTextEmotions();
    console.log(res);

    return NextResponse.json({ analizeSentiments: res })

}