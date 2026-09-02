import React, { useEffect, useState } from 'react';
import { DecodedPrescription, TargetLanguage } from '../types/prescription';
import { TTSService } from '../services/ttsService';
import { Volume2, Play, Pause, Square } from 'lucide-react';

interface ReadAloudPlayerProps {
  prescription: DecodedPrescription;
  language: TargetLanguage;
}

export const ReadAloudPlayer: React.FC<ReadAloudPlayerProps> = ({
  prescription,
  language
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentScript, setCurrentScript] = useState('');

  useEffect(() => {
    TTSService.initVoiceList(() => {});
    const script = TTSService.generatePrescriptionScript(prescription, language);
    setCurrentScript(script);

    return () => {
      TTSService.stop();
    };
  }, [prescription, language]);

  const handlePlay = () => {
    if (isPaused) {
      TTSService.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const script = TTSService.generatePrescriptionScript(prescription, language);
    setCurrentScript(script);

    setIsPlaying(true);
    setIsPaused(false);

    TTSService.speak(script, language, {
      rate: 0.95, // Slightly slower, clear pace for easy understanding
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
      }
    });
  };

  const handlePause = () => {
    TTSService.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    TTSService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="tts-giant-card">
      <div className="tts-giant-wrapper">
        {!isPlaying ? (
          <button className="btn-giant-speaker" onClick={handlePlay}>
            <Volume2 size={32} className="icon-pulse" />
            <div className="speaker-text font-bold">
              <span>{language === 'hi' ? '🔊 दवा बोलकर सुनें (Read Aloud)' : '🔊 Read Medicines Aloud'}</span>
              <small>{language === 'hi' ? 'दवाइयों के नाम और खुराक हिंदी में सुनें' : 'Listen to medicine names & dosages'}</small>
            </div>
          </button>
        ) : (
          <div className="tts-active-controls">
            <button className="btn-giant-speaker is-speaking" onClick={handlePause}>
              <Pause size={28} />
              <span>{language === 'hi' ? 'रोकें (Pause)' : 'Pause Audio'}</span>
            </button>
            <button className="btn-stop-speech" onClick={handleStop}>
              <Square size={20} />
              <span>{language === 'hi' ? 'बंद करें' : 'Stop'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
