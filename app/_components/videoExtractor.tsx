'use client'
import React, { useState, useEffect} from 'react';
import ReactPlayer from 'react-player';


const YouTubeInputPlayer: React.FC<{ onUrlChange: (url: string) => void, playTime?: number }> = ({ onUrlChange, playTime }) => {
  const [url, setUrl] = useState('');


  useEffect(() => {
    onUrlChange(url);
    console.log('cambi de url de s de dintre');
  }, [url, onUrlChange]);

  return (
    <div className="flex flex-col items-center justify-center p-5 space-y-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Introdueix l'URL de YouTube aquí"
        className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent color-black"
      />
      {url && <ReactPlayer url={url}

        width="60%"
        height="auto"
        style={{ aspectRatio: '16 / 9' }}
        config={{
          youtube: {
            playerVars: { fs: 1 } // Aquesta línia habilita el botó de pantalla completa en els vídeos de YouTube
          }
        }}
        controls={true}
      />}

    </div>
  );
};

export default YouTubeInputPlayer;