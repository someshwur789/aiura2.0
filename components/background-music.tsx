'use client';

import { useEffect, useRef, useState } from 'react';

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element with all autoplay attributes
    const audio = new Audio('/avengers_endgame.mp3');
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = 0.4;
    audio.muted = false;
    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', '');
    audioRef.current = audio;

    // Update playing state when audio plays/pauses
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    
    // Aggressive autoplay function with retry mechanism
    const attemptPlay = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If play fails, try again after a short delay
            setTimeout(attemptPlay, 1000);
          });
        }
      }
    };

    // Try to play immediately
    attemptPlay();

    // Also try when the window loads
    window.addEventListener('load', attemptPlay);

    // Try to play when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isPlaying) {
        attemptPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up an interval to keep trying if not playing
    const playInterval = setInterval(() => {
      if (!isPlaying) {
        attemptPlay();
      }
    }, 2000);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
      }
      window.removeEventListener('load', attemptPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(playInterval);
    };
  }, [isPlaying]); // Add isPlaying as dependency

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Only show controls if music isn't playing
  return !isPlaying ? (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        aria-label="Play background music"
      >
        <PlayIcon className="w-6 h-6 text-white" />
      </button>
      <div className="bg-black/50 text-white text-sm py-2 px-4 rounded-full animate-pulse">
        Click to play music
      </div>
    </div>
  ) : null;
};

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);
