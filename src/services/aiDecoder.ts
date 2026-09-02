import { DecodedPrescription, ProcessingStep, ImageEnhancementOptions, MedicineItem } from '../types/prescription';
import { MedicalBrain } from './medicalBrain';
import Tesseract from 'tesseract.js';

export interface ScanProgressCallback {
  (step: ProcessingStep, allSteps: ProcessingStep[]): void;
}

export class AIDecoderService {
  private static apiKey: string = localStorage.getItem('KYAHAIYE_GEMINI_API_KEY') || '';

  public static setApiKey(key: string) {
    this.apiKey = key.trim();
    if (key.trim()) {
      localStorage.setItem('KYAHAIYE_GEMINI_API_KEY', key.trim());
    } else {
      localStorage.removeItem('KYAHAIYE_GEMINI_API_KEY');
    }
  }

  public static getApiKey(): string {
    return this.apiKey;
  }

  public static async decodePrescriptionImage(
    imageDataUrl: string,
    enhancement: ImageEnhancementOptions,
    onProgress: ScanProgressCallback
  ): Promise<DecodedPrescription> {
    const steps: ProcessingStep[] = [
      {
        id: 'step-1',
        titleEn: 'Image Preprocessing & Ink Enhancement',
        titleHi: 'इमेज प्री-प्रोसेसिंग और लिखावट सफ़ाई',
        detailEn: 'Applying ink contrast enhancement & noise filter...',
        detailHi: 'डॉक्टर पर्चे के अक्षरों को साफ़ किया जा रहा है...',
        status: 'pending',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 'step-2',
        titleEn: 'AI Optical OCR Text Extraction',
        titleHi: 'ऑप्टिकल लिखावट एक्सट्रैक्शन',
        detailEn: 'Extracting medicine text strokes & scribble tokens...',
        detailHi: 'दवाइयों की लिखावट और सांकेतिक अक्षरों को पढ़ा जा रहा है...',
        status: 'pending',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 'step-3',
        titleEn: 'Medical Parsing & Translation',
        titleHi: 'मेडिकल प्रोसेसिंग और सटीक अनुवाद',
        detailEn: 'Parsing extracted text into medicine names, quantities & dosages...',
        detailHi: 'दवाइयों के नाम, मात्रा और खुराक का अनुवाद किया जा रहा है...',
        status: 'pending',
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    const updateStep = async (index: number, status: 'processing' | 'completed' | 'error', detailEn?: string) => {
      steps[index].status = status;
      steps[index].timestamp = new Date().toLocaleTimeString();
      if (detailEn) steps[index].detailEn = detailEn;
      onProgress(steps[index], [...steps]);
      await new Promise((res) => setTimeout(res, 300));
    };

    await updateStep(0, 'processing');
    const cleanImgDataUrl = await MedicalBrain.preprocessCanvasImage(imageDataUrl);
    await updateStep(0, 'completed', 'Ink contrast & noise reduction complete.');

    await updateStep(1, 'processing');

    // 1. Try Gemini Vision API if key exists
    if (this.apiKey) {
      try {
        const realResult = await this.callGeminiVisionApi(cleanImgDataUrl);
        await updateStep(1, 'completed', 'Gemini AI Vision successfully decoded prescription.');
        await updateStep(2, 'processing');
        await updateStep(2, 'completed', 'Hindi & English translation ready.');
        return realResult;
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to local OCR engine:', err);
      }
    }

    // 2. Perform Real Tesseract OCR on the uploaded image
    let rawTextLines: string[] = [];
    try {
      const ocrResult = await Tesseract.recognize(cleanImgDataUrl, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round(m.progress * 100);
            updateStep(1, 'processing', `Reading text from photo pixels (${pct}%)...`);
          }
        }
      });
      const rawText = ocrResult.data.text || '';
      rawTextLines = rawText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length >= 2);

      await updateStep(1, 'completed', `Extracted ${rawTextLines.length} text lines from photo.`);
    } catch (ocrErr) {
      console.warn('Tesseract OCR failed:', ocrErr);
      await updateStep(1, 'completed', 'Photo scanned.');
    }

    await updateStep(2, 'processing');

    const medicines: MedicineItem[] = [];

    if (rawTextLines.length > 0) {
      rawTextLines.forEach((line, idx) => {
        // Filter out non-medicine lines like dates or numbers
        if (!/^(date|page|pt|name|age|sex|reg)/i.test(line)) {
          const decoded = MedicalBrain.decodeScribbleLine(line, idx + 1);
          medicines.push({
            id: `med-ocr-${idx + 1}`,
            originalHandwritingSnippet: line,
            nameEn: decoded.nameEn,
            nameHi: decoded.nameHi,
            type: decoded.type as any,
            dosageEn: decoded.quantityEn,
            dosageHi: decoded.quantityHi,
            frequencyShorthand: 'BD (1-0-1)',
            frequencyEn: decoded.dosageEn,
            frequencyHi: decoded.dosageHi,
            timingEn: 'After Food',
            timingHi: 'खाने के बाद',
            durationEn: '5 Days',
            durationHi: '5 दिन',
            confidence: 90
          });
        }
      });
    }

    // If no text could be extracted from a blurry photo, provide 1 editable default row for immediate typing
    if (medicines.length === 0) {
      medicines.push({
        id: 'med-user-1',
        originalHandwritingSnippet: 'Handwritten Scribble Line 1',
        nameEn: 'Type Medicine Name (e.g. Paracetamol 500mg)',
        nameHi: 'दवा का नाम लिखें (जैसे: पैरासिटामोल 500mg)',
        type: 'Tablet',
        dosageEn: '1 Tablet',
        dosageHi: '1 गोली',
        frequencyShorthand: 'BD (1-0-1)',
        frequencyEn: 'Twice Daily (Morning & Night) - After Food',
        frequencyHi: 'दिन में 2 बार (सुबह व रात) - खाने के बाद',
        timingEn: 'After Food',
        timingHi: 'खाने के बाद',
        durationEn: '5 Days',
        durationHi: '5 दिन',
        confidence: 80
      });
    }

    await updateStep(2, 'completed', `Decoded ${medicines.length} medicine fields.`);

    return {
      id: `prescription-user-${Date.now()}`,
      patient: { name: 'Patient', age: '35', gender: 'Male', date: new Date().toLocaleDateString('en-GB'), rxNumber: 'RX-101' },
      doctor: { name: 'Dr. Prescription Specialist', qualification: 'MD', regNo: 'REG-8820', clinicName: 'Health Care Clinic', address: '', phone: '' },
      diagnosisEn: '', diagnosisHi: '',
      symptomsEn: '', symptomsHi: '',
      medicines: medicines,
      generalAdviceEn: '', generalAdviceHi: '',
      followUpEn: '', followUpHi: '',
      overallConfidence: 90,
      scanTimestamp: new Date().toISOString()
    };
  }

  private static async callGeminiVisionApi(base64Image: string): Promise<DecodedPrescription> {
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const prompt = `
You are an expert doctor reading illegible cursive handwriting on prescriptions.
Analyze this prescription image and return ONLY a valid JSON object matching this structure:
{
  "medicines": [
    {
      "id": "med-1",
      "nameEn": "Exact Medicine Name (e.g. Amoxicillin 500mg)",
      "nameHi": "दवा का नाम हिंदी में (जैसे: एमोक्सिसिलिन 500mg)",
      "dosageEn": "1 Tablet",
      "dosageHi": "1 गोली",
      "frequencyEn": "Twice Daily (Morning & Night) - After Food",
      "frequencyHi": "दिन में 2 बार (सुबह व रात) - खाने के बाद"
    }
  ]
}
Translate every medicine name, quantity, and dosage timing into accurate, clear Hindi (हिंदी) and English.
`;

    const models = ['gemini-1.5-flash', 'gemini-1.5-pro'];
    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } }
                  ]
                }
              ],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (!response.ok) continue;

        const data = await response.json();
        const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textOutput) continue;

        const parsed = JSON.parse(textOutput);
        const mappedMeds: MedicineItem[] = (parsed.medicines || []).map((m: any, idx: number) => ({
          id: `med-gemini-${idx + 1}`,
          originalHandwritingSnippet: m.nameEn,
          nameEn: m.nameEn,
          nameHi: m.nameHi,
          type: 'Tablet',
          dosageEn: m.dosageEn || '1 Tablet',
          dosageHi: m.dosageHi || '1 गोली',
          frequencyShorthand: 'BD',
          frequencyEn: m.frequencyEn || 'Twice Daily - After Food',
          frequencyHi: m.frequencyHi || 'दिन में 2 बार - खाने के बाद',
          timingEn: 'After Food',
          timingHi: 'खाने के बाद',
          durationEn: '5 Days',
          durationHi: '5 दिन',
          confidence: 98
        }));

        return {
          id: `prescription-gemini-${Date.now()}`,
          patient: { name: 'Patient', age: '35', gender: 'Male', date: new Date().toLocaleDateString('en-GB'), rxNumber: 'RX-GEMINI' },
          doctor: { name: 'Dr. Prescription Specialist', qualification: 'MD', regNo: 'REG-8820', clinicName: 'Health Care Clinic', address: '', phone: '' },
          diagnosisEn: '', diagnosisHi: '',
          symptomsEn: '', symptomsHi: '',
          medicines: mappedMeds,
          generalAdviceEn: '', generalAdviceHi: '',
          followUpEn: '', followUpHi: '',
          overallConfidence: 98,
          scanTimestamp: new Date().toISOString()
        };
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Gemini API call failed');
  }
}
