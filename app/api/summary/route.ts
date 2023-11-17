
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server';
import { log } from 'console';




const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
// const video = "https://www.youtube.com/watch?v=gWwyQjgXCGo";



    export async function POST(req: Request) {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();
    
     console.log(messages);

    

    // const newMessage = async () => {

    //     const response = await openai.chat.completions.create({
    //         model: 'gpt-4-1106-preview',
    //         stream: false,
    //         messages: [
    //             { role: "system", content: "You are a true professional at summarizing a text." },
    //             {
    //                 role: "user",
    //                 content: `You are a true professional at summarizing a text and determining whether the text answers these 3 questions. I need you to provide me with a summary on one hand, and on the other hand, tell me which QUESTIONS remain unanswered. slpit with || the summary and th unsanwered questions: "summary || unanwered question number" following the EXAMPLE:

    //                 UNANSWERED QUESTIONS:
    //                 1 How do you feel at home?
    //                 2 How do you feel at school?
    //                 3 How do you feel with the family?

    //                 EXAMPLE: Summary of the content || 1, 2
    //               `,
    //             },
    //         ],
    //         max_tokens: 1000,
    //         temperature: 0,

    //     })
  

    //     return {response};
    // }


    // const message = await newMessage();
  
    return NextResponse.json({ message:'eieieiei'});
}
