export type TargetLanguage = 'hi' | 'en';

export interface MedicineItem {
  id: string;
  originalHandwritingSnippet: string; // Describes doctor scribble pattern
  nameEn: string;
  nameHi: string;
  type: 'Tablet' | 'Capsule' | 'Syrup' | 'Ointment' | 'Injection' | 'Drops' | 'Other';
  dosageEn: string;
  dosageHi: string;
  frequencyShorthand: string; // BD, OD, TDS, QID, HS, SOS, etc.
  frequencyEn: string;
  frequencyHi: string;
  timingEn: string; // e.g. After meals
  timingHi: string; // e.g. खाने के बाद
  durationEn: string;
  durationHi: string;
  instructionsEn?: string;
  instructionsHi?: string;
  warningEn?: string;
  warningHi?: string;
  confidence: number; // 0 to 100
}

export interface DoctorInfo {
  name: string;
  qualification: string;
  regNo: string;
  clinicName: string;
  address: string;
  phone: string;
}

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  date: string;
  rxNumber: string;
}

export interface DecodedPrescription {
  id: string;
  patient: PatientInfo;
  doctor: DoctorInfo;
  diagnosisEn: string;
  diagnosisHi: string;
  symptomsEn: string;
  symptomsHi: string;
  medicines: MedicineItem[];
  generalAdviceEn: string;
  generalAdviceHi: string;
  followUpEn: string;
  followUpHi: string;
  overallConfidence: number;
  scanTimestamp: string;
  rawAnalysisText?: string;
}

export interface ImageEnhancementOptions {
  contrast: number; // 0 to 200 (100 normal)
  brightness: number; // 0 to 200 (100 normal)
  grayscale: boolean;
  binarize: boolean; // Black & white document filter
  threshold: number; // 0 to 255 for binarization
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number; // 0.5 to 2
  pitch: number; // 0.5 to 1.5
  selectedVoice: SpeechSynthesisVoice | null;
  currentWordIndex: number;
  spokenText: string;
}

export interface ProcessingStep {
  id: string;
  titleEn: string;
  titleHi: string;
  detailEn: string;
  detailHi: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
}
