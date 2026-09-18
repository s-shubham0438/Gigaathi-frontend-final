import { useState } from 'react';

export const useVoiceGuide = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text, lang = 'hi-IN') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser environment');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
  };
};

export default useVoiceGuide;
