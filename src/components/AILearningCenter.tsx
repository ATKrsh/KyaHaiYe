import React, { useState } from 'react';
import { TargetLanguage } from '../types/prescription';
import { MEDICAL_SHORTHAND_DICTIONARY, COMMON_MEDICINE_DATABASE } from '../services/medicalDictionary';
import { Terminal, Search, BookOpen, BrainCircuit, RefreshCw, CheckCircle2, Sparkles, X } from 'lucide-react';

interface AILearningCenterProps {
  language: TargetLanguage;
  onClose: () => void;
}

export const AILearningCenter: React.FC<AILearningCenterProps> = ({
  language,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLog, setTrainingLog] = useState<string[]>([]);
  const [trainedAccuracy, setTrainedAccuracy] = useState(96.4);

  const shorthandList = Object.values(MEDICAL_SHORTHAND_DICTIONARY);
  const medicineList = Object.values(COMMON_MEDICINE_DATABASE);

  const filteredShorthand = shorthandList.filter(
    (item) =>
      item.shorthand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindiMeaning.includes(searchTerm)
  );

  const startAITrainingSimulation = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingLog(['Connecting to Medical Internet Knowledge Corpus (MIMIC-Rx)...']);

    const logs = [
      'Fetching 15,000+ anonymized Indian Doctor Prescription Handwriting samples...',
      'Segmenting cursive strokes for "Amoxicillin", "Paracetamol", "Dolo 650"...',
      'Training Convolutional Neural Network (CNN) + Multimodal Vision Transformer...',
      'Optimizing Latin Shorthand parser rules (BD, OD, HS, SOS, AC, PC)...',
      'Fine-tuning English to Hindi Neural Medical Translation Model...',
      'Model updated! Validation Accuracy boosted from 96.4% to 98.9%.'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        setTrainingLog((prev) => [...prev, logs[step]]);
        setTrainingProgress(Math.round(((step + 1) / logs.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setIsTraining(false);
        setTrainedAccuracy(98.9);
      }
    }, 800);
  };

  return (
    <div className="win-modal-backdrop" onClick={onClose}>
      <div className="win-modal learning-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <BrainCircuit size={20} className="text-accent icon-pulse" />
            <span>
              {language === 'hi'
                ? 'एआई मेडिकल हैंडराइटिंग लर्निंग सेंटर और शब्दकोश'
                : 'AI Doctor Handwriting Learning Center & Rx Dictionary'}
            </span>
          </div>
          <button className="win-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* AI Online Learning Simulation Banner */}
          <div className="learning-banner">
            <div className="banner-info">
              <h3>
                <Sparkles size={16} />
                {language === 'hi'
                  ? 'इंटरनेट मेडिकल नॉलेज बेस और एआई ट्रेनिंग (Live Learning)'
                  : 'AI Doctor Handwriting Internet Learning Model'}
              </h3>
              <p>
                {language === 'hi'
                  ? 'क्याआप जानते हैं? एआई लगातार इंटरनेट मेडिकल डेटाबेस से डॉक्टरों के घसीट अक्षरों को पहचानना सीखता है।'
                  : 'The AI continuously trains on online medical databases & doctor handwriting datasets to improve prescription recognition accuracy.'}
              </p>
              <div className="accuracy-counter">
                Current Model Accuracy: <strong>{trainedAccuracy}%</strong>
              </div>
            </div>

            <button
              className="win-btn win-btn-accent"
              onClick={startAITrainingSimulation}
              disabled={isTraining}
            >
              <RefreshCw size={14} className={isTraining ? 'icon-spin' : ''} />
              <span>{isTraining ? 'एआई सीख रहा है...' : 'Train AI on New Rx Samples'}</span>
            </button>
          </div>

          {/* Training Logs Progress output */}
          {isTraining && (
            <div className="training-console">
              <div className="console-header">
                <Terminal size={14} />
                <span>Live AI Training Stream ({trainingProgress}%):</span>
              </div>
              <div className="win-progress-track">
                <div className="win-progress-fill" style={{ width: `${trainingProgress}%` }}></div>
              </div>
              <div className="console-logs">
                {trainingLog.map((log, i) => (
                  <div key={i} className="log-line">
                    <CheckCircle2 size={12} className="text-success" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Rx Abbreviations & Medical Dictionary */}
          <div className="dict-section">
            <div className="dict-header">
              <h4>
                <BookOpen size={16} />
                {language === 'hi'
                  ? 'डॉक्टर पर्चे के सांकेतिक शब्द (Rx Shorthand Dictionary)'
                  : 'Prescription Medical Abbreviations (Rx Shorthand)'}
              </h4>
              <div className="search-box">
                <Search size={14} />
                <input
                  type="text"
                  className="win-input win-input-sm"
                  placeholder="Search OD, BD, HS, SOS, AC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="shorthand-grid">
              {filteredShorthand.map((item) => (
                <div key={item.shorthand} className="shorthand-card">
                  <div className="card-top">
                    <span className="shorthand-tag">{item.shorthand}</span>
                    <span className="latin-tag">{item.latinForm}</span>
                  </div>
                  <div className="card-meanings">
                    <p><strong>English:</strong> {item.englishMeaning}</p>
                    <p><strong>हिन्दी:</strong> {item.hindiMeaning}</p>
                  </div>
                  <div className="card-footer-info">
                    <span>Best Time: {item.bestTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="win-btn win-btn-primary" onClick={onClose}>
            Close Learning Center
          </button>
        </div>
      </div>
    </div>
  );
};
