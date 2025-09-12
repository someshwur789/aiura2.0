'use client';

import { useEffect } from 'react';

export const BackgroundSound = () => {
  useEffect(() => {
    // Create audio element with all autoplay attributes
    const audio = new Audio('/avengers_endgame.mp3');
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = 0.4;
    audio.muted = false;
    
    // Aggressive autoplay function with retry mechanism
    const startPlayback = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If play fails, try again after a short delay
          setTimeout(startPlayback, 1000);
        });
      }
    };

    // Initial playback attempt
    startPlayback();

    // Try when window loads
    window.addEventListener('load', startPlayback);

    // Try when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startPlayback();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Keep trying periodically
    const playbackInterval = setInterval(startPlayback, 2000);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.remove();
      window.removeEventListener('load', startPlayback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(playbackInterval);
    };
  }, []); // No dependencies

  return null;
};
