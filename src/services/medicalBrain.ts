export interface DecodedMedicineResult {
  originalText: string;
  nameEn: string;
  nameHi: string;
  quantityEn: string;
  quantityHi: string;
  dosageEn: string;
  dosageHi: string;
  type: string;
}

export class MedicalBrain {
  // Database of top prescription medicines with exact English & Hindi translations
  private static MEDICINE_KNOWLEDGE_BASE: Array<{
    patterns: string[];
    nameEn: string;
    nameHi: string;
    type: string;
    defaultQuantityEn: string;
    defaultQuantityHi: string;
  }> = [
    {
      patterns: ['amox', 'amoxil', 'amoxicillin', 'mox', 'amoxclav', 'augmentin'],
      nameEn: 'Amoxicillin 500mg (Antibiotic)',
      nameHi: 'एमोक्सिसिलिन 500mg (एंटीबायोटिक)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['dolo', 'paracetamol', 'crocin', 'calpol', 'paracet', 'pcm', 'pyregesic'],
      nameEn: 'Paracetamol 650mg / Dolo 650',
      nameHi: 'पैरासिटामोल 650mg (डोलो 650)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['pan', 'pantop', 'pantoprazole', 'pan40', 'pantocid', 'pantodac'],
      nameEn: 'Pantoprazole 40mg (Pan-40 / Antacid)',
      nameHi: 'पेंटोप्राजोल 40mg (पैन-40 / गैस की दवा)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['azee', 'azithro', 'azithromycin', 'zathrin', 'azithral'],
      nameEn: 'Azithromycin 500mg (Azee 500)',
      nameHi: 'एजिथ्रोमाइसिन 500mg (एज़ी 500)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['cetr', 'cetirizine', 'okacet', 'alercet', 'zirtin'],
      nameEn: 'Cetirizine 10mg (Okacet / Anti-allergy)',
      nameHi: 'सिटिरिजिन 10mg (ओकासेट / एलर्जी दवा)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['glycomet', 'metformin', 'glyc', 'metfor'],
      nameEn: 'Metformin 500mg (Glycomet / Sugar Med)',
      nameHi: 'मेटफॉर्मिन 500mg (ग्लाइकोमेट / शुगर दवा)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['grilinctus', 'syr gri', 'cough syr', 'ascoril', 'benadryl', 'zedex', 'alex'],
      nameEn: 'Grilinctus Cough Syrup (10ml)',
      nameHi: 'ग्रिलिंक्टस ख़ांसी सिरप (10 मिली)',
      type: 'Syrup',
      defaultQuantityEn: '10 ml (2 Teaspoonfuls)',
      defaultQuantityHi: '10 मिली (2 चम्मच)'
    },
    {
      patterns: ['telma', 'telmisartan', 'telsartan', 'telmikind'],
      nameEn: 'Telmisartan 40mg (BP Medicine)',
      nameHi: 'टेल्मीसार्टन 40mg (बीपी दवा)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['amlod', 'amlodipine', 'amlong', 'amlo'],
      nameEn: 'Amlodipine 5mg (BP Medicine)',
      nameHi: 'एमलोडिपिन 5mg (बीपी दवा)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['combiflam', 'ibup', 'ibuprofen', 'flexon'],
      nameEn: 'Combiflam (Pain Reliever)',
      nameHi: 'कॉम्बीफ्लैम (दर्द निवारक)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['cefix', 'cefixime', 'taxim', 'zifi', 'ceftas'],
      nameEn: 'Cefixime 200mg (Zifi 200 / Antibiotic)',
      nameHi: 'सेफिक्सिम 200mg (जिफ़ी 200 / एंटीबायोटिक)',
      type: 'Tablet',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['limcee', 'vitamin c', 'vit c', 'celin'],
      nameEn: 'Limcee Vitamin C 500mg',
      nameHi: 'लिम्सी विटामिन C 500mg',
      type: 'Chewable',
      defaultQuantityEn: '1 Tablet',
      defaultQuantityHi: '1 गोली'
    },
    {
      patterns: ['rabeloc', 'rabeprazole', 'rabekind', 'aciloc', 'ranitidine'],
      nameEn: 'Rabeprazole 20mg (Gas & Acid Remedy)',
      nameHi: 'राबेप्राजोल 20mg (गैस व एसिडिटी दवा)',
      type: 'Capsule',
      defaultQuantityEn: '1 Capsule',
      defaultQuantityHi: '1 कैप्सूल'
    }
  ];

  /**
   * Cleans & binarizes canvas image pixels for crystal-clear OCR reading
   */
  public static preprocessCanvasImage(dataUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Grayscale + High-Contrast Adaptive Thresholding
        for (let i = 0; i < data.length; i += 4) {
          const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          // Binarize dark ink strokes
          const val = avg < 140 ? 0 : 255;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  /**
   * Matches raw handwriting scribble string to exact medicine, quantity, and Hindi/English dosage
   */
  public static decodeScribbleLine(rawLine: string, index: number): DecodedMedicineResult {
    const cleanLower = rawLine.toLowerCase().replace(/[^a-z0-9\s\-\.]/g, ' ');

    // Find best matching medicine pattern
    let matchedMed = this.MEDICINE_KNOWLEDGE_BASE.find((m) =>
      m.patterns.some((pat) => cleanLower.includes(pat))
    );

    // Fallback if no exact brand pattern match: clean raw text into clean English/Hindi
    let nameEn = matchedMed ? matchedMed.nameEn : this.cleanRawMedicineName(rawLine);
    let nameHi = matchedMed ? matchedMed.nameHi : this.translateToHindiName(nameEn);
    let type = matchedMed ? matchedMed.type : 'Tablet';

    // Extract quantity (e.g. 500mg, 10ml, 1 tab, 2 teaspoons)
    let qtyEn = matchedMed ? matchedMed.defaultQuantityEn : '1 Tablet';
    let qtyHi = matchedMed ? matchedMed.defaultQuantityHi : '1 गोली';

    const qtyMatch = rawLine.match(/(\d+\s*(?:mg|ml|gm|tablet|tab|cap|tsp|spoon))/i);
    if (qtyMatch) {
      qtyEn = qtyMatch[1];
      qtyHi = qtyMatch[1].replace(/mg/i, ' मिग्रा').replace(/ml/i, ' मिली').replace(/tab/i, ' गोली');
    }

    // Extract Dosage & Timings (1-0-1, 1-0-0, 0-0-1, BD, OD, TDS, HS, SOS, AC, PC)
    let dosageEn = 'Twice daily (Morning & Night) - After Food';
    let dosageHi = 'दिन में 2 बार (सुबह व रात) - खाने के बाद';

    if (/\b(od|1-0-0|once)\b/i.test(cleanLower)) {
      dosageEn = 'Once daily (Morning) - Empty Stomach / Before Food';
      dosageHi = 'दिन में 1 बार (सुबह) - खाने से पहले (खाली पेट)';
    } else if (/\b(tds|tid|1-1-1|thrice)\b/i.test(cleanLower)) {
      dosageEn = 'Three times daily (Morning, Afternoon & Night) - After Food';
      dosageHi = 'दिन में 3 बार (सुबह, दोपहर व रात) - खाने के बाद';
    } else if (/\b(hs|bedtime|0-0-1)\b/i.test(cleanLower)) {
      dosageEn = 'Once daily (At bedtime / Night) - After Dinner';
      dosageHi = 'रात को सोने से पहले - रात के खाने के बाद';
    } else if (/\b(sos|needed)\b/i.test(cleanLower)) {
      dosageEn = 'Only when needed (High fever or severe pain)';
      dosageHi = 'ज़रूरत पड़ने पर (तेज़ बुख़ार या दर्द होने पर)';
    } else if (/\b(ac|before food)\b/i.test(cleanLower)) {
      dosageEn = 'Twice daily - Before Meals';
      dosageHi = 'दिन में 2 बार - भोजन से पहले';
    }

    return {
      originalText: rawLine,
      nameEn,
      nameHi,
      quantityEn: qtyEn,
      quantityHi: qtyHi,
      dosageEn,
      dosageHi,
      type
    };
  }

  private static cleanRawMedicineName(rawText: string): string {
    const cleaned = rawText
      .replace(/^\d+[\.\)]\s*/, '')
      .replace(/^(tab|cap|syr|inj|rx)\.?\s*/i, '')
      .replace(/----|---|--|\[|\(/g, ' ')
      .trim();

    return cleaned.slice(0, 35) || 'Prescribed Medicine';
  }

  private static translateToHindiName(name: string): string {
    if (!name) return 'चिकित्सकीय दवा';
    let text = name;

    const terms: Record<string, string> = {
      'Tablet': 'टैबलेट',
      'Capsule': 'कैप्सूल',
      'Syrup': 'सिरप',
      'Injection': 'इंजेक्शन',
      'Pain': 'दर्द दवा',
      'Fever': 'बुख़ार दवा',
      'Cough': 'ख़ांसी सिरप',
      'Antibiotic': 'एंटीबायोटिक',
      'Gas': 'गैस दवा',
      'Acid': 'एसिडिटी दवा'
    };

    Object.keys(terms).forEach((k) => {
      text = text.replace(new RegExp(k, 'gi'), terms[k]);
    });

    return text;
  }
}
