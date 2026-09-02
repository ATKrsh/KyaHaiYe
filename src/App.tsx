import React, { useState, useRef } from 'react';
import { TitleBar } from './components/TitleBar';
import { ImageUploader } from './components/ImageUploader';
import { PrescriptionScanner } from './components/PrescriptionScanner';
import { DecodedResultView } from './components/DecodedResultView';
import { ReadAloudPlayer } from './components/ReadAloudPlayer';
import { WhitePrescriptionExporter } from './components/WhitePrescriptionExporter';

import { DecodedPrescription, ProcessingStep, TargetLanguage } from './types/prescription';
import { AIDecoderService } from './services/aiDecoder';
import { TTSService } from './services/ttsService';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<TargetLanguage>('hi'); // Default Hindi
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [decodedResult, setDecodedResult] = useState<DecodedPrescription | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectImage = async (dataUrl: string) => {
    setSelectedImage(dataUrl);
    setDecodedResult(null);
    setIsScanning(true);
    TTSService.stop();

    try {
      const result = await AIDecoderService.decodePrescriptionImage(
        dataUrl,
        { contrast: 120, brightness: 105, grayscale: false, binarize: false, threshold: 128 },
        (step, allSteps) => setProcessingSteps([...allSteps])
      );
      setDecodedResult(result);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);

    } catch (err) {
      console.error('Failed to decode prescription:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="app-container dark-theme">
      {/* Title Bar */}
      <TitleBar
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          TTSService.stop();
        }}
      />

      {/* Main Content */}
      <main className="main-content-simple">
        {/* Step 1: Photo Input */}
        <section className="step-section">
          <ImageUploader
            onImageSelected={handleSelectImage}
            language={language}
            isScanning={isScanning}
          />
        </section>

        {/* Scan Animation */}
        {selectedImage && isScanning && (
          <section className="step-section">
            <PrescriptionScanner
              imageDataUrl={selectedImage}
              enhancement={{ contrast: 120, brightness: 105, grayscale: false, binarize: false, threshold: 128 }}
              steps={processingSteps}
              isScanning={isScanning}
              language={language}
            />
          </section>
        )}

        {/* Step 2 & 3: Results & Speaker Audio */}
        {decodedResult && !isScanning && (
          <div ref={resultsRef} className="results-container-simple">
            {/* Speaker Read-Aloud Button */}
            <section className="step-section">
              <ReadAloudPlayer
                prescription={decodedResult}
                language={language}
              />
            </section>

            {/* Medicine Names & Dosages Cards (Editable) */}
            <section className="step-section">
              <DecodedResultView
                prescription={decodedResult}
                language={language}
                onUpdatePrescription={setDecodedResult}
              />
            </section>

            {/* Clean White Prescription Exporter */}
            <section className="step-section">
              <WhitePrescriptionExporter
                prescription={decodedResult}
                language={language}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
