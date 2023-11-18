'use client'


import YouTubeInputPlayer from '@/app/_components/videoExtractor';
import { extractYouTubeVideoID, scrapeYoutubeSubtitles } from '@/utils/youtubeLoader';



const blockChat = () => {

  const handleUrlChange = async(url: string) => {

    if (url.length > 0) {
      const urlString = extractYouTubeVideoID(url);
      const str =await scrapeYoutubeSubtitles(urlString);
      console.log(str);
    }else{
      console.log('no url');
    }

  };


  return (
    <>
      <div className="flex flex-col h-screen justify-end">
        <div className='my-auto'>
          <YouTubeInputPlayer onUrlChange={handleUrlChange} />
        </div>
      </div>

    </>
  )
}

export default blockChat