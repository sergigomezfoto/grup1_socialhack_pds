'use client'


import YouTubeInputPlayer from '@/app/_components/videoExtractor';
import { extractYouTubeVideoID, scrapeYoutubeSubtitles } from '@/utils/youtubeLoader';



const blockChat = () => {




  return (
    <>
      <div className="flex flex-col h-screen justify-end">
        <div className='my-auto'>
          <YouTubeInputPlayer/>
        </div>
      </div>

    </>
  )
}

export default blockChat