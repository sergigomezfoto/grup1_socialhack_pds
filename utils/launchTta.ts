

const launchTta = async (txt: string) => {

    const response = await fetch('api/tts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tta: txt}),
    });
    const res = await response.json();
    // console.log(res.message);
    
    return `data:audio/mpeg;base64,${res.message}`;
    
};

export default launchTta;