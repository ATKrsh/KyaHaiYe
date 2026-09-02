import React, { useRef, useEffect, useState } from 'react';
import { DecodedPrescription, TargetLanguage } from '../types/prescription';
import { Download, Printer, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WhitePrescriptionExporterProps {
  prescription: DecodedPrescription;
  language: TargetLanguage;
}

export const WhitePrescriptionExporter: React.FC<WhitePrescriptionExporterProps> = ({
  prescription,
  language
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string>('');

  useEffect(() => {
    drawCleanWhitePrescription();
  }, [prescription, language]);

  const drawCleanWhitePrescription = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI canvas (800x1000)
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // Pristine White Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Outer Frame Border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Top Banner
    const themeColor = '#1e3a8a';
    ctx.fillStyle = themeColor;
    ctx.fillRect(20, 20, width - 40, 10);

    // Header Title
    ctx.fillStyle = themeColor;
    ctx.font = 'bold 26px "Outfit", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(
      language === 'hi' ? 'साफ़ पर्चा (दवाइयाँ और खुराक)' : 'CLEAN PRESCRIPTION OUTPUT',
      40,
      65
    );

    ctx.fillStyle = '#475569';
    ctx.font = '14px "Outfit", sans-serif';
    ctx.fillText(`Date: ${new Date().toLocaleDateString('en-GB')}`, width - 180, 65);

    // Line Divider
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 85);
    ctx.lineTo(width - 40, 85);
    ctx.stroke();

    // Rx Logo
    ctx.fillStyle = themeColor;
    ctx.font = 'bold 44px "Caveat", "Outfit", cursive';
    ctx.fillText('Rx', 40, 140);

    // Medicines Table Grid
    let startY = 160;
    const tableX = 40;
    const tableWidth = width - 80;

    // Table Header Fill
    ctx.fillStyle = themeColor;
    ctx.fillRect(tableX, startY, tableWidth, 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Outfit", "Noto Sans Devanagari", sans-serif';
    ctx.fillText('#', tableX + 15, startY + 24);
    ctx.fillText(language === 'hi' ? 'दवा का नाम (Medicine Name)' : 'Medicine Name', tableX + 55, startY + 24);
    ctx.fillText(language === 'hi' ? 'मात्रा (Quantity)' : 'Quantity', tableX + 380, startY + 24);
    ctx.fillText(language === 'hi' ? 'खुराक व समय (Dosage & Timing)' : 'Dosage & Timing', tableX + 540, startY + 24);

    startY += 36;

    // Table Rows - ONLY Medicine Name, Quantity, and Dosage
    prescription.medicines.forEach((med, idx) => {
      const rowHeight = 64;
      ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
      ctx.fillRect(tableX, startY, tableWidth, rowHeight);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(tableX, startY, tableWidth, rowHeight);

      // Index
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px "Outfit", sans-serif';
      ctx.fillText(`${idx + 1}.`, tableX + 15, startY + 38);

      // Medicine Name
      const medName = language === 'hi' ? med.nameHi : med.nameEn;
      ctx.font = 'bold 16px "Outfit", "Noto Sans Devanagari", sans-serif';
      ctx.fillText(medName, tableX + 55, startY + 38);

      // Quantity
      const qtyText = language === 'hi' ? med.dosageHi : med.dosageEn;
      ctx.font = '15px "Outfit", "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = '#1e293b';
      ctx.fillText(qtyText, tableX + 380, startY + 38);

      // Dosage & Timing
      const freqText = language === 'hi' ? `${med.frequencyHi} (${med.timingHi})` : `${med.frequencyEn} (${med.timingEn})`;
      ctx.font = 'bold 14px "Outfit", "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = '#0f766e';
      ctx.fillText(freqText, tableX + 540, startY + 38);

      startY += rowHeight;
    });

    // Footer Verified Seal
    const footerY = height - 70;
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(40, footerY);
    ctx.lineTo(width - 40, footerY);
    ctx.stroke();

    ctx.fillStyle = themeColor;
    ctx.font = 'bold 16px "Caveat", cursive';
    ctx.fillText('Verified Decoded Clean Output', width - 260, footerY + 35);

    setGeneratedImgUrl(canvas.toDataURL('image/png'));
  };

  const handleDownload = () => {
    if (!generatedImgUrl) return;
    const link = document.createElement('a');
    link.download = `Clean_Prescription_${language}.png`;
    link.href = generatedImgUrl;
    link.click();

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  const handlePrint = () => {
    const win = window.open('');
    if (win) {
      win.document.write(`<img src="${generatedImgUrl}" style="max-width:100%;" />`);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 300);
    }
  };

  return (
    <div className="white-exporter-simple-card">
      <div className="section-title-bar">
        <FileCheck size={26} className="text-success" />
        <h2>
          {language === 'hi'
            ? '📄 साफ़ सफ़ेद फोटो (Clean White Output Image)'
            : '📄 Clean White Output Prescription Image'}
        </h2>
      </div>

      <div className="white-exporter-actions">
        <button className="btn-big-download" onClick={handleDownload}>
          <Download size={22} />
          <span>{language === 'hi' ? '📥 साफ़ फोटो डाउनलोड करें (Download PNG)' : 'Download Clean PNG Image'}</span>
        </button>

        <button className="btn-print-simple" onClick={handlePrint}>
          <Printer size={18} />
          <span>{language === 'hi' ? 'प्रिंट करें' : 'Print Clean Rx'}</span>
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {generatedImgUrl && (
        <div className="white-paper-preview-frame">
          <img src={generatedImgUrl} alt="Clean White Prescription" className="white-paper-img" />
        </div>
      )}
    </div>
  );
};
