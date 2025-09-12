'use client';

import { useEffect } from 'react';

export const AutoplayMusic = () => {
  useEffect(() => {
    // Create audio element with all autoplay attributes
    const audio = new Audio('/avengers_endgame.mp3');
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = 0.4;
    audio.muted = false;
    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', '');
    
    // Aggressive autoplay function with retry mechanism
    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If play fails, try again after a short delay
          setTimeout(attemptPlay, 1000);
        });
      }
    };

    // Try to play immediately
    attemptPlay();

    // Also try when the window loads
    window.addEventListener('load', attemptPlay);

    // Try to play when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    });

    // Set up an interval to keep trying
    const playInterval = setInterval(attemptPlay, 2000);

    // Cleanup function
    return () => {
      audio.pause();
      audio.remove();
      window.removeEventListener('load', attemptPlay);
      clearInterval(playInterval);
    };
  }, []); // Empty dependency array

  // No visible UI elements - we don't want any manual controls
  return null;
}
