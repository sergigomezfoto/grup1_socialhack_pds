const launchWordSentiments = async (word: string) => {

    const response = await fetch('api/sentiments_from_text', {
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