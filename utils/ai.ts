// import "dotenv/config";

import OpenAI from "openai";
export const openai = new OpenAI();
// console.log(openai);

export const formatMessage = (userInput)=>({role:"user",content:userInput})