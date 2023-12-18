import { baseApiUrl } from "./envorlocal";



const launchWordSentiments = async (word: string) => {

    const response = await fetch(`${baseApiUrl}/api/sentiments_from_text`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word}),
    });
    const res = await response.json();
    console.log(res.analizeSentiments);
    
    return res;
    
};

export default launchWordSentiments;