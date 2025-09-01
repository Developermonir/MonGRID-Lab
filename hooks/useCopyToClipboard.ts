
import { useState, useCallback } from 'react';

// This function will play a short 'blip' sound.
// It uses the Web Audio API, so it doesn't require any audio files.
const playSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A6 note
    oscillator.start(audioContext.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.error("Could not play sound:", error);
  }
};

export const useCopyToClipboard = (): [(text: string) => Promise<void>, boolean] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      playSound();
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.warn('Copy failed', error);
      setIsCopied(false);
    }
  }, []);

  return [copy, isCopied];
};
