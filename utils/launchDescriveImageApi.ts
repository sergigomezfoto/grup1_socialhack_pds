import { Message } from 'ai/react';


const launchDescriveImageApi = async (img: string) => {

    const response = await fetch('api/descrive_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({img}),
        
    });
    const res = await response.json();
    
    
return  res.message.message.content;
    
};

export default launchDescriveImageApi;