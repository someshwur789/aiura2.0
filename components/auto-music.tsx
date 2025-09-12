'use client';

import { useEffect } from 'react';

export const AutoMusic = () => {
  useEffect(() => {
    let audio: HTMLAudioElement;

    const setupAudio = () => {
      audio = new Audio('/avengers_endgame.mp3');
      audio.loop = true;
      audio.autoplay = true;
      audio.volume = 0.4;
      audio.muted = false;
      audio.setAttribute('playsinline', '');
      audio.setAttribute('webkit-playsinline', '');
    };

    const startPlaying = async () => {
      try {
        await audio.play();
      } catch (err) {
        // If autoplay fails, try again
        setTimeout(startPlaying, 1000);
      }
    };

    // Initial setup
    setupAudio();
    startPlaying();

    // Try playing when window loads
    window.addEventListener('load', startPlaying);

    // Try playing when tab becomes visible
    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') {
        startPlaying();
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    // Keep trying to play periodically
    const playInterval = setInterval(startPlaying, 2000);

    return () => {
      if (audio) {
        audio.pause();
        audio.remove();
      }
      window.removeEventListener('load', startPlaying);
      document.removeEventListener('visibilitychange', visibilityHandler);
      clearInterval(playInterval);
    };
  }, []); // Empty dependency array - only run once

  return null; // No visual elements needed
};
