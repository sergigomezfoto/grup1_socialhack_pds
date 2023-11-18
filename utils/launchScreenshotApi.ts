


const launchScreenshotApi = async (url: string) => {

    const response = await fetch('api/screenshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urlTarget: url}),
    });
    
    // console.log(response.json());
    
return response.json();
    
};

export default launchScreenshotApi;