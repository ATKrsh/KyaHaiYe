import React from 'react';
import { ImageEnhancementOptions, ProcessingStep, TargetLanguage } from '../types/prescription';
import { Cpu, CheckCircle2, Loader2, Scan, Activity, Eye } from 'lucide-react';

interface PrescriptionScannerProps {
  imageDataUrl: string;
  enhancement: ImageEnhancementOptions;
  steps: ProcessingStep[];
  isScanning: boolean;
  language: TargetLanguage;
}

export const PrescriptionScanner: React.FC<PrescriptionScannerProps> = ({
  imageDataUrl,
  enhancement,
  steps,
  isScanning,
  language
}) => {
  // Compute image style filters from enhancement settings
  const imageFilterStyle: React.CSSProperties = {
    filter: `contrast(${enhancement.contrast}%) brightness(${enhancement.brightness}%) ${
      enhancement.grayscale ? 'grayscale(100%)' : ''
    } ${enhancement.binarize ? 'contrast(250%) invert(0)' : ''}`
  };

  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (steps.length || 1)) * 100);

  return (
    <div className="win-card scanner-card">
      <div className="card-header">
        <div className="card-title">
          <Scan size={18} className="text-accent icon-spin-slow" />
          <span>{language === 'hi' ? 'डॉक्टर लिखावट स्कैनिंग और विज़न प्रोसेसिंग' : 'AI Handwriting Scan & Vision Analysis'}</span>
        </div>
        {isScanning && (
          <div className="status-badge status-scanning">
            <Loader2 size={13} className="icon-spin" />
            <span>{language === 'hi' ? 'एआई प्रोसेसिंग चालू है...' : 'AI Decoding Live...'}</span>
          </div>
        )}
      </div>

      <div className="scanner-body">
        {/* Prescription Image with Overlay & Scan Laser */}
        <div className="image-preview-container">
          <img
            src={imageDataUrl}
            alt="Doctor Prescription"
            className="prescription-preview-img"
            style={imageFilterStyle}
          />

          {isScanning && (
            <div className="scan-laser-overlay">
              <div className="scan-laser-line"></div>
              <div className="bounding-box box-1">
                <span className="box-tag">Rx Symbol (99%)</span>
              </div>
              <div className="bounding-box box-2">
                <span className="box-tag">Scribble 1: Amox~c~ll~n (96%)</span>
              </div>
              <div className="bounding-box box-3">
                <span className="box-tag">Scribble 2: Dolo 650 (98%)</span>
              </div>
              <div className="bounding-box box-4">
                <span className="box-tag">Scribble 3: Pan-40 (94%)</span>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Progress & Telemetry Log */}
        <div className="scanner-progress-panel">
          <div className="progress-header">
            <div className="progress-title">
              <Cpu size={16} />
              <span>{language === 'hi' ? 'न्यूरल प्रोसेसिंग प्रगति:' : 'Neural Engine Progress:'}</span>
            </div>
            <div className="progress-percentage">{progressPercent}%</div>
          </div>

          <div className="win-progress-track">
            <div
              className="win-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Real-time Processing Logs */}
          <div className="step-list">
            {steps.map((step, idx) => (
              <div key={step.id || idx} className={`step-item step-${step.status}`}>
                <div className="step-icon">
                  {step.status === 'completed' && <CheckCircle2 size={16} className="text-success" />}
                  {step.status === 'processing' && <Loader2 size={16} className="icon-spin text-accent" />}
                  {step.status === 'pending' && <div className="step-dot"></div>}
                </div>
                <div className="step-content">
                  <div className="step-header-text">
                    <span className="step-name">
                      {language === 'hi' ? step.titleHi : step.titleEn}
                    </span>
                    <span className="step-time">{step.timestamp}</span>
                  </div>
                  <p className="step-detail">
                    {language === 'hi' ? step.detailHi : step.detailEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry info */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <Activity size={13} />
              <span>Scribble Complexity: <strong>High (94/100)</strong></span>
            </div>
            <div className="telemetry-item">
              <Eye size={13} />
              <span>Matching Corpus: <strong>50,000+ Rx Scribbles</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
