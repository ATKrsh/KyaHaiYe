export interface ShorthandDefinition {
  shorthand: string;
  latinForm: string;
  englishMeaning: string;
  hindiMeaning: string;
  frequencyDaysPerDay: number;
  bestTime: string;
  category: 'Frequency' | 'Timing' | 'Route' | 'Unit';
}

export const MEDICAL_SHORTHAND_DICTIONARY: Record<string, ShorthandDefinition> = {
  'OD': {
    shorthand: 'OD',
    latinForm: 'Omni Die',
    englishMeaning: 'Once daily',
    hindiMeaning: 'दिन में एक बार',
    frequencyDaysPerDay: 1,
    bestTime: 'Morning or Fixed time',
    category: 'Frequency'
  },
  'BD': {
    shorthand: 'BD / BID',
    latinForm: 'Bis In Die',
    englishMeaning: 'Twice daily (12 hours apart)',
    hindiMeaning: 'दिन में 2 बार (12 घंटे के अंतर पर)',
    frequencyDaysPerDay: 2,
    bestTime: 'Morning & Evening',
    category: 'Frequency'
  },
  'TDS': {
    shorthand: 'TDS / TID',
    latinForm: 'Ter In Die',
    englishMeaning: 'Three times daily (8 hours apart)',
    hindiMeaning: 'दिन में 3 बार (8 घंटे के अंतर पर)',
    frequencyDaysPerDay: 3,
    bestTime: 'Morning, Afternoon & Night',
    category: 'Frequency'
  },
  'QID': {
    shorthand: 'QID',
    latinForm: 'Quater In Die',
    englishMeaning: 'Four times daily (6 hours apart)',
    hindiMeaning: 'दिन में 4 बार (6 घंटे के अंतर पर)',
    frequencyDaysPerDay: 4,
    bestTime: 'Every 6 hours',
    category: 'Frequency'
  },
  'HS': {
    shorthand: 'HS',
    latinForm: 'Hora Somni',
    englishMeaning: 'At bedtime',
    hindiMeaning: 'रात को सोने से पहले',
    frequencyDaysPerDay: 1,
    bestTime: 'Bedtime',
    category: 'Timing'
  },
  'SOS': {
    shorthand: 'SOS',
    latinForm: 'Si Opus Sit',
    englishMeaning: 'As needed / Only in case of severe pain or high fever',
    hindiMeaning: 'ज़रूरत पड़ने पर (तेज़ दर्द या बुख़ार होने पर)',
    frequencyDaysPerDay: 0,
    bestTime: 'When symptoms occur',
    category: 'Timing'
  },
  'AC': {
    shorthand: 'AC',
    latinForm: 'Ante Cibum',
    englishMeaning: 'Before meals (30 mins prior)',
    hindiMeaning: 'खाने से पहले (30 मिनट पहले)',
    frequencyDaysPerDay: 0,
    bestTime: 'Before Food',
    category: 'Timing'
  },
  'PC': {
    shorthand: 'PC',
    latinForm: 'Post Cibum',
    englishMeaning: 'After meals',
    hindiMeaning: 'खाने के बाद',
    frequencyDaysPerDay: 0,
    bestTime: 'After Food',
    category: 'Timing'
  },
  'STAT': {
    shorthand: 'STAT',
    latinForm: 'Statim',
    englishMeaning: 'Immediately / Right now',
    hindiMeaning: 'तुरंत (अभी ले ले)',
    frequencyDaysPerDay: 1,
    bestTime: 'Immediate',
    category: 'Timing'
  },
  'Tab': {
    shorthand: 'Tab',
    latinForm: 'Tabella',
    englishMeaning: 'Tablet',
    hindiMeaning: 'गोली (टैबलेट)',
    frequencyDaysPerDay: 0,
    bestTime: 'Oral',
    category: 'Unit'
  },
  'Cap': {
    shorthand: 'Cap',
    latinForm: 'Capsula',
    englishMeaning: 'Capsule',
    hindiMeaning: 'कैप्सूल',
    frequencyDaysPerDay: 0,
    bestTime: 'Oral',
    category: 'Unit'
  },
  'Syr': {
    shorthand: 'Syr',
    latinForm: 'Syrupus',
    englishMeaning: 'Syrup / Liquid medicine',
    hindiMeaning: 'सिरप (तरल दवा)',
    frequencyDaysPerDay: 0,
    bestTime: 'Oral',
    category: 'Unit'
  }
};

export interface MedicineKnowledge {
  name: string;
  genericName: string;
  category: string;
  purposeEn: string;
  purposeHi: string;
  commonDosage: string;
  safetyAdviceEn: string;
  safetyAdviceHi: string;
}

export const COMMON_MEDICINE_DATABASE: Record<string, MedicineKnowledge> = {
  'Amoxicillin': {
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotic (Penicillin)',
    purposeEn: 'Treats bacterial infections of lungs, throat, ear, and skin.',
    purposeHi: 'फेफड़ों, गले, कान और त्वचा के बैक्टीरियल संक्रमण का इलाज करती है।',
    commonDosage: '500mg BD (Twice daily)',
    safetyAdviceEn: 'Complete full course even if feeling better.',
    safetyAdviceHi: 'बेहतर महसूस होने पर भी पूरा कोर्स ख़त्म करें।'
  },
  'Paracetamol': {
    name: 'Paracetamol 650mg / Dolo 650',
    genericName: 'Acetaminophen / Paracetamol',
    category: 'Analgesic & Antipyretic',
    purposeEn: 'Reduces fever, body pain, and headaches.',
    purposeHi: 'बुख़ार, बदन दर्द और सिरदर्द को कम करता है।',
    commonDosage: '650mg SOS / TDS (Max 4 per day)',
    safetyAdviceEn: 'Do not exceed 4g per day to prevent liver toxicity.',
    safetyAdviceHi: 'लिवर की सुरक्षा के लिए दिन में 4 ग्राम से अधिक न लें।'
  },
  'Pantoprazole': {
    name: 'Pantoprazole 40mg / Pan-40',
    genericName: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor (Antacid)',
    purposeEn: 'Reduces stomach acid, prevents acidity and gastritis.',
    purposeHi: 'पेट के तेजाब (एसिडिटी) और गैस को कम करता है।',
    commonDosage: '40mg OD AC (Morning before breakfast)',
    safetyAdviceEn: 'Take 30 minutes before first meal with plain water.',
    safetyAdviceHi: 'सुबह नाश्ते से 30 मिनट पहले सादे पानी के साथ लें।'
  },
  'Azithromycin': {
    name: 'Azithromycin 500mg / Azee 500',
    genericName: 'Azithromycin',
    category: 'Macrolide Antibiotic',
    purposeEn: 'Treats chest infections, bronchitis, and sinus infection.',
    purposeHi: 'सीने में जकड़न, ब्रोंकाइटिस और साइनस संक्रमण का इलाज करता है।',
    commonDosage: '500mg OD (Once daily for 3-5 days)',
    safetyAdviceEn: 'Take at the same time each day.',
    safetyAdviceHi: 'हर दिन एक ही समय पर लें।'
  },
  'Cetirizine': {
    name: 'Cetirizine 10mg / Okacet',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamine (Anti-allergy)',
    purposeEn: 'Relieves sneezing, runny nose, allergy, and skin hives.',
    purposeHi: 'छींकने, बहती नाक, एलर्जी और त्वचा की खुजली में राहत देता है।',
    commonDosage: '10mg HS (Night before sleep)',
    safetyAdviceEn: 'May cause mild sleepiness; avoid driving.',
    safetyAdviceHi: 'हल्की नींद आ सकती है; गाड़ी चलाने से बचें।'
  },
  'Metformin': {
    name: 'Metformin 500mg / Glycomet',
    genericName: 'Metformin Hydrochloride',
    category: 'Anti-Diabetic',
    purposeEn: 'Controls blood sugar levels in Type 2 Diabetes.',
    purposeHi: 'टाइप 2 डायबिटीज़ में ब्लड शुगर के स्तर को नियंत्रित करता है।',
    commonDosage: '500mg BD PC (With or after meals)',
    safetyAdviceEn: 'Take with food to minimize upset stomach.',
    safetyAdviceHi: 'पेट की ख़राबी से बचने के लिए भोजन के साथ लें।'
  }
};
