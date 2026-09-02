import { DecodedPrescription } from '../types/prescription';

export interface SamplePrescriptionOption {
  id: string;
  titleEn: string;
  titleHi: string;
  doctorTypeEn: string;
  doctorTypeHi: string;
  difficulty: 'Noodle Scribble (Hard)' | 'Doctor Cursive (Medium)' | 'Messy Notes (Hard)';
  imageUrl: string;
  data: DecodedPrescription;
}

export const SAMPLE_PRESCRIPTIONS: SamplePrescriptionOption[] = [
  {
    id: 'sample-1',
    titleEn: 'General Physician Rx (Fever & Cough)',
    titleHi: 'जनरल फिजिशियन पर्चा (बुख़ार और ख़ांसी)',
    doctorTypeEn: 'Dr. A. K. Sharma (MD, Gen Med)',
    doctorTypeHi: 'डॉ. ए. के. शर्मा (एमडी, जनरल मेडिसिन)',
    difficulty: 'Noodle Scribble (Hard)',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" style="background:%23fffdf7;"><rect width="100%" height="100%" fill="%23fffdf7"/><g stroke="%233b82f6" stroke-width="1.5" opacity="0.3"><line x1="40" y1="120" x2="560" y2="120"/><line x1="40" y1="720" x2="560" y2="720"/></g><text x="50" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="%231e3a8a">CITY HEALTH CLINIC &amp; RESEARCH CENTER</text><text x="50" y="75" font-family="sans-serif" font-size="14" fill="%23475569">Dr. A. K. Sharma | M.D. (Internal Med) | Reg No: 88492-DL</text><text x="50" y="95" font-family="sans-serif" font-size="12" fill="%2364748b">Ph: +91 98765-43210 | 12 Park Avenue, Connaught Place, New Delhi</text><text x="50" y="150" font-family="sans-serif" font-size="14" font-weight="600" fill="%230f172a">Pt. Name: Rahul Verma</text><text x="320" y="150" font-family="sans-serif" font-size="14" font-weight="600" fill="%230f172a">Age/Sex: 34 / Male</text><text x="460" y="150" font-family="sans-serif" font-size="14" font-weight="600" fill="%230f172a">Date: 24/07/2026</text><text x="50" y="190" font-family="sans-serif" font-size="13" fill="%23475569">C/o: High fever (101 F) x 3 days, dry cough, severe bodyache</text><text x="50" y="210" font-family="sans-serif" font-size="13" fill="%23475569">O/E: BP: 120/80 mmHg, Pulse: 84/min, Chest: Clear</text><text x="50" y="270" font-family="Caveat, cursive" font-size="64" font-weight="bold" fill="%231d4ed8">Rx</text><path d="M 120,290 C 140,260 170,300 210,270 C 240,295 280,265 340,285 C 380,270 410,290 450,275 C 470,280 500,270 530,280" fill="none" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/><text x="120" y="325" font-family="Caveat, cursive" font-size="28" fill="%23000000">1. Tab. Amox~c~ll~n 500mg ------ 1 -- 0 -- 1 (5 days) [p.c.]</text><path d="M 120,380 C 160,355 220,390 280,360 C 320,375 390,350 480,370" fill="none" stroke="%230f172a" stroke-width="2.5"/><text x="120" y="415" font-family="Caveat, cursive" font-size="28" fill="%23000000">2. Tab. Dolo 650mg / Parac~t~m~l ---- 1 -- 1 -- 1 (S.O.S severe pain)</text><path d="M 120,470 C 180,450 250,480 340,455 C 410,470 490,450 540,465" fill="none" stroke="%230f172a" stroke-width="2.5"/><text x="120" y="505" font-family="Caveat, cursive" font-size="28" fill="%23000000">3. Tab. Pan-40 (Panto~~az~le) ---- 1 -- 0 -- 0 (A.C. Empty stomach)</text><path d="M 120,560 C 170,545 220,570 310,550 C 400,565 480,545 520,555" fill="none" stroke="%230f172a" stroke-width="2.5"/><text x="120" y="595" font-family="Caveat, cursive" font-size="28" fill="%23000000">4. Syr. Gr~l~nctus (10ml) ------------ 0 -- 0 -- 1 (H.S. Bedtime)</text><text x="50" y="660" font-family="sans-serif" font-size="13" font-weight="600" fill="%23334155">Adv: Drink plenty of warm liquids, complete bed rest for 3 days.</text><text x="50" y="680" font-family="sans-serif" font-size="13" font-weight="600" fill="%23334155">Review: After 5 days or immediately if fever > 102 F.</text><text x="420" y="750" font-family="Caveat, cursive" font-size="26" fill="%231e40af">Dr. A. K. Sharma (Sign)</text></svg>',
    data: {
      id: 'prescription-sample-1',
      patient: {
        name: 'Rahul Verma',
        age: '34 Yrs',
        gender: 'Male',
        date: '24/07/2026',
        rxNumber: 'RX-2026-8891'
      },
      doctor: {
        name: 'Dr. A. K. Sharma',
        qualification: 'M.D. (Internal Medicine), MBBS',
        regNo: '88492-DL',
        clinicName: 'City Health Clinic & Research Center',
        address: '12 Park Avenue, Connaught Place, New Delhi',
        phone: '+91 98765-43210'
      },
      diagnosisEn: 'Acute Upper Respiratory Tract Infection with High Fever',
      diagnosisHi: 'तीव्र ऊपरी श्वसन पथ का संक्रमण और तेज़ बुख़ार',
      symptomsEn: 'High fever (101°F) for 3 days, dry cough, severe bodyache & fatigue',
      symptomsHi: '3 दिनों से तेज़ बुख़ार (101°F), सूखी ख़ांसी, बदन में तेज़ दर्द और थकान',
      medicines: [
        {
          id: 'med-1',
          originalHandwritingSnippet: '1. Tab. Amox~c~ll~n 500mg ------ 1 -- 0 -- 1 (5 days) [p.c.]',
          nameEn: 'Amoxicillin 500mg',
          nameHi: 'एमोक्सिसिलिन 500 मिग्रा',
          type: 'Tablet',
          dosageEn: '1 Tablet',
          dosageHi: '1 गोली',
          frequencyShorthand: 'BD (1-0-1)',
          frequencyEn: 'Twice daily (Morning & Night)',
          frequencyHi: 'दिन में 2 बार (सुबह और रात)',
          timingEn: 'After Food (Post Cibum - PC)',
          timingHi: 'खाने के बाद',
          durationEn: '5 Days',
          durationHi: '5 दिन',
          instructionsEn: 'Take with a full glass of water. Complete 5-day course.',
          instructionsHi: 'पूरे 1 गिलास पानी के साथ लें। 5 दिन का कोर्स पूरा करें।',
          warningEn: 'Do not skip doses to prevent antibiotic resistance.',
          warningHi: 'एंटीबायोटिक प्रतिरोध से बचने के लिए खुराक न छोड़ें।',
          confidence: 96
        },
        {
          id: 'med-2',
          originalHandwritingSnippet: '2. Tab. Dolo 650mg / Parac~t~m~l ---- 1 -- 1 -- 1 (S.O.S severe pain)',
          nameEn: 'Paracetamol 650mg (Dolo 650)',
          nameHi: 'पैरासिटामोल 650 मिग्रा (डोलो 650)',
          type: 'Tablet',
          dosageEn: '1 Tablet',
          dosageHi: '1 गोली',
          frequencyShorthand: 'TDS / SOS (1-1-1)',
          frequencyEn: 'Three times a day or when needed for fever > 100°F',
          frequencyHi: 'दिन में 3 बार या जब तेज़ बुख़ार/दर्द हो (SOS)',
          timingEn: 'After Food',
          timingHi: 'खाने के बाद',
          durationEn: '3-5 Days (As needed)',
          durationHi: '3-5 दिन (ज़रूरत पड़ने पर)',
          instructionsEn: 'Keep 6 hours gap between two tablets.',
          instructionsHi: 'दो गोलियों के बीच 6 घंटे का अंतर रखें।',
          warningEn: 'Max 4 tablets (2.6g) per 24 hours.',
          warningHi: '24 घंटे में अधिकतम 4 गोलियां ही लें।',
          confidence: 98
        },
        {
          id: 'med-3',
          originalHandwritingSnippet: '3. Tab. Pan-40 (Panto~~az~le) ---- 1 -- 0 -- 0 (A.C. Empty stomach)',
          nameEn: 'Pantoprazole 40mg (Pan-40)',
          nameHi: 'पेंटोप्राजोल 40 मिग्रा (पैन-40)',
          type: 'Tablet',
          dosageEn: '1 Tablet',
          dosageHi: '1 गोली',
          frequencyShorthand: 'OD (1-0-0)',
          frequencyEn: 'Once daily in the morning',
          frequencyHi: 'दिन में 1 बार (सुबह खाली पेट)',
          timingEn: 'Before Food / Empty Stomach (Ante Cibum - AC)',
          timingHi: 'नाश्ते से 30 मिनट पहले खाली पेट',
          durationEn: '5 Days',
          durationHi: '5 दिन',
          instructionsEn: 'Swallow whole with plain water 30 mins before breakfast.',
          instructionsHi: 'सुबह नाश्ते से 30 मिनट पहले पानी के साथ साबुत निगलें।',
          warningEn: 'Do not crush or chew the tablet.',
          warningHi: 'गोली को चबाएं या तोड़ें नहीं।',
          confidence: 94
        },
        {
          id: 'med-4',
          originalHandwritingSnippet: '4. Syr. Gr~l~nctus (10ml) ------------ 0 -- 0 -- 1 (H.S. Bedtime)',
          nameEn: 'Grilinctus Cough Syrup (10ml)',
          nameHi: 'ग्रिलिंक्टस सिरप (10 मिली)',
          type: 'Syrup',
          dosageEn: '10 ml (2 teaspoonfuls)',
          dosageHi: '10 मिली (2 चम्मच)',
          frequencyShorthand: 'HS (0-0-1)',
          frequencyEn: 'Once at bedtime',
          frequencyHi: 'रात को सोने से पहले (HS)',
          timingEn: 'After Night Dinner',
          timingHi: 'रात के भोजन के बाद',
          durationEn: '5 Days',
          durationHi: '5 दिन',
          instructionsEn: 'Shake bottle well before use. Sip slowly.',
          instructionsHi: 'इस्तेमाल से पहले बोतल को अच्छी तरह हिलाएं। धीरे-धीरे पिएं।',
          warningEn: 'May cause drowsiness.',
          warningHi: 'हल्की नींद या सुस्ती आ सकती है।',
          confidence: 91
        }
      ],
      generalAdviceEn: 'Drink plenty of warm liquids, steam inhalation twice a day, complete bed rest for 3 days. Avoid cold food and drinks.',
      generalAdviceHi: 'प्रचुर मात्रा में गुनगुना पानी और तरल पदार्थ पिएं, दिन में दो बार भाप लें, 3 दिन पूर्ण विश्राम करें। ठंडे खान-पान से बचें।',
      followUpEn: 'Review after 5 days, or immediately if fever exceeds 102°F or breathlessness occurs.',
      followUpHi: '5 दिनों के बाद फिर से दिखाएं, या यदि बुख़ार 102°F से अधिक हो या सांस फूले तो तुरंत आएं।',
      overallConfidence: 95,
      scanTimestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-2',
    titleEn: 'Gastroenterologist Rx (Acidity & Indigestion)',
    titleHi: 'पेट रोग विशेषज्ञ का पर्चा (एसिडिटी और बदहजमी)',
    doctorTypeEn: 'Dr. Meenakshi Sundaram (MD, DM Gastro)',
    doctorTypeHi: 'डॉ. मीनाक्षी सुंदरम (एमडी, डीएम गैस्ट्रो)',
    difficulty: 'Doctor Cursive (Medium)',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" style="background:%23f8fafc;"><rect width="100%" height="100%" fill="%23f8fafc"/><text x="50" y="50" font-family="sans-serif" font-size="20" font-weight="bold" fill="%230f766e">MAXCARE DIGESTIVE &amp; LIVER CLINIC</text><text x="50" y="75" font-family="sans-serif" font-size="13" fill="%23334155">Dr. Meenakshi Sundaram | DM Gastroenterology | Reg: 45910</text><line x1="40" y1="100" x2="560" y2="100" stroke="%230d9488" stroke-width="2"/><text x="50" y="130" font-family="sans-serif" font-size="13" fill="%230f172a">Patient: Smt. Sunita Devi (Age: 52 / F) | Date: 24/07/2026</text><text x="50" y="180" font-family="Caveat, cursive" font-size="58" font-weight="bold" fill="%230f766e">Rx</text><text x="120" y="240" font-family="Caveat, cursive" font-size="27" fill="%23111827">1. Cap. Rabeprazole 20mg + Domperidone 30mg (Rabeloc-RD) -- 1 OD (AC)</text><text x="120" y="320" font-family="Caveat, cursive" font-size="27" fill="%23111827">2. Syr. Sucralfate 10ml ---------------- 1 BD (Before Food)</text><text x="120" y="400" font-family="Caveat, cursive" font-size="27" fill="%23111827">3. Tab. Drotaverine 80mg (Drotaver) ---- 1 SOS (For severe stomach cramp)</text><text x="50" y="550" font-family="sans-serif" font-size="13" fill="%23334155">Advice: Low spice diet, walk 20 mins after dinner, no alcohol/tobacco.</text></svg>',
    data: {
      id: 'prescription-sample-2',
      patient: {
        name: 'Sunita Devi',
        age: '52 Yrs',
        gender: 'Female',
        date: '24/07/2026',
        rxNumber: 'RX-GASTRO-4412'
      },
      doctor: {
        name: 'Dr. Meenakshi Sundaram',
        qualification: 'M.D. (Internal Med), DM (Gastroenterology)',
        regNo: '45910-KMC',
        clinicName: 'MaxCare Digestive & Liver Clinic',
        address: '88 Healthcare Avenue, MG Road, Bengaluru',
        phone: '+91 99001-12233'
      },
      diagnosisEn: 'GERD (Gastroesophageal Reflux Disease) & Functional Dyspepsia',
      diagnosisHi: 'जीईआरडी (पेट की गैस/एसिड गले में आना) और अपच',
      symptomsEn: 'Heartburn, chest tightness after meals, bloating, nausea',
      symptomsHi: 'खाने के बाद छाती में जलन, पेट फूलना, खट्टी डकार और जी मिचलाना',
      medicines: [
        {
          id: 'med-201',
          originalHandwritingSnippet: '1. Cap. Rabeprazole 20mg + Domperidone 30mg (Rabeloc-RD) -- 1 OD (AC)',
          nameEn: 'Rabeprazole 20mg + Domperidone 30mg (Rabeloc-RD)',
          nameHi: 'राबेप्राजोल 20mg + डोमपेरिडोन 30mg (रेबलोक-आरडी)',
          type: 'Capsule',
          dosageEn: '1 Capsule',
          dosageHi: '1 कैप्सूल',
          frequencyShorthand: 'OD (1-0-0)',
          frequencyEn: 'Once daily in the morning',
          frequencyHi: 'दिन में 1 बार (सुबह खाली पेट)',
          timingEn: 'Before Food (AC)',
          timingHi: 'सुबह भोजन/नाश्ते से 30 मिनट पहले',
          durationEn: '14 Days',
          durationHi: '14 दिन',
          instructionsEn: 'Take with water first thing in the morning.',
          instructionsHi: 'सुबह सबसे पहले पानी के साथ लें।',
          confidence: 97
        },
        {
          id: 'med-202',
          originalHandwritingSnippet: '2. Syr. Sucralfate 10ml ---------------- 1 BD (Before Food)',
          nameEn: 'Sucralfate Syrup 10ml',
          nameHi: 'सुक्रालफेट सिरप 10 मिली',
          type: 'Syrup',
          dosageEn: '10 ml',
          dosageHi: '10 मिली',
          frequencyShorthand: 'BD (1-0-1)',
          frequencyEn: 'Twice a day (Morning & Evening)',
          frequencyHi: 'दिन में 2 बार',
          timingEn: '1 hour before lunch & dinner',
          timingHi: 'दोपहर व रात के खाने से 1 घंटा पहले',
          durationEn: '10 Days',
          durationHi: '10 दिन',
          instructionsEn: 'Forms a protective coat over stomach lining.',
          instructionsHi: 'पेट की परत पर सुरक्षात्मक परत बनाता है।',
          confidence: 93
        }
      ],
      generalAdviceEn: 'Strictly avoid spicy, oily, fried foods, caffeine, and tea. Do not lie down immediately after eating.',
      generalAdviceHi: 'मसालेदार, तला हुआ खाना, चाय व कॉफ़ी से परहेज़ करें। खाने के तुरंत बाद न सोएं।',
      followUpEn: 'Review after 2 weeks with Endoscopy report if symptoms persist.',
      followUpHi: '2 सप्ताह बाद दिखाएं, यदि लक्षण बने रहें तो एंडोस्कोपी कराएं।',
      overallConfidence: 94,
      scanTimestamp: new Date().toISOString()
    }
  }
];
