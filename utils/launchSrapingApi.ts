

const launchScrapingApi = async (url: string) => {

    const response = await fetch('api/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urlTarget: url}),
    });
    const res = await response.json();
    return res;
    
};

export default launchScrapingApi;