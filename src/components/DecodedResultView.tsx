import React from 'react';
import { DecodedPrescription, MedicineItem, TargetLanguage } from '../types/prescription';
import { Pill, Clock, Plus, Trash2, Edit3 } from 'lucide-react';

interface DecodedResultViewProps {
  prescription: DecodedPrescription;
  language: TargetLanguage;
  onUpdatePrescription: (updated: DecodedPrescription) => void;
}

export const DecodedResultView: React.FC<DecodedResultViewProps> = ({
  prescription,
  language,
  onUpdatePrescription
}) => {

  const handleMedChange = (id: string, field: keyof MedicineItem, val: string) => {
    const updated = prescription.medicines.map((m) => {
      if (m.id === id) {
        // Automatically sync English/Hindi if name changes
        if (field === 'nameEn') {
          return { ...m, nameEn: val, nameHi: val };
        }
        if (field === 'nameHi') {
          return { ...m, nameHi: val, nameEn: val };
        }
        return { ...m, [field]: val };
      }
      return m;
    });
    onUpdatePrescription({ ...prescription, medicines: updated });
  };

  const handleAddMedicine = () => {
    const newMed: MedicineItem = {
      id: `med-added-${Date.now()}`,
      originalHandwritingSnippet: 'User Entered Medicine',
      nameEn: language === 'hi' ? 'नई दवा का नाम' : 'New Medicine Name',
      nameHi: 'नई दवा का नाम',
      type: 'Tablet',
      dosageEn: '1 Tablet',
      dosageHi: '1 गोली',
      frequencyShorthand: 'BD',
      frequencyEn: 'Twice daily - After Food',
      frequencyHi: 'दिन में 2 बार - खाने के बाद',
      timingEn: 'After Food',
      timingHi: 'खाने के बाद',
      durationEn: '5 Days',
      durationHi: '5 दिन',
      confidence: 100
    };
    onUpdatePrescription({
      ...prescription,
      medicines: [...prescription.medicines, newMed]
    });
  };

  const handleDeleteMedicine = (id: string) => {
    const updated = prescription.medicines.filter((m) => m.id !== id);
    onUpdatePrescription({ ...prescription, medicines: updated });
  };

  return (
    <div className="decoded-simple-card">
      <div className="section-title-bar-with-action">
        <div className="section-title-bar">
          <Pill size={26} className="text-accent" />
          <h2>
            {language === 'hi'
              ? '💊 2. दवा के नाम, मात्रा और खुराक (एडिट कर सकते हैं)'
              : '💊 2. Medicine Name, Quantity & Dosage (Editable)'}
          </h2>
        </div>

        <button className="btn-add-med" onClick={handleAddMedicine}>
          <Plus size={18} />
          <span>{language === 'hi' ? '+ दवा जोड़ें' : '+ Add Medicine'}</span>
        </button>
      </div>

      {/* Medicines Cards List - Fully Editable */}
      <div className="medicine-cards-list">
        {prescription.medicines.map((med, idx) => (
          <div key={med.id || idx} className="med-card-editable">
            <div className="med-card-number">{idx + 1}</div>

            <div className="med-card-content">
              {/* Editable Medicine Name Input */}
              <div className="med-header-row">
                <input
                  type="text"
                  className="input-med-name-large"
                  value={language === 'hi' ? med.nameHi : med.nameEn}
                  onChange={(e) =>
                    handleMedChange(
                      med.id,
                      language === 'hi' ? 'nameHi' : 'nameEn',
                      e.target.value
                    )
                  }
                  placeholder={language === 'hi' ? 'दवा का नाम लिखें...' : 'Type medicine name...'}
                />

                <button
                  className="btn-delete-med"
                  onClick={() => handleDeleteMedicine(med.id)}
                  title="Remove Medicine"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Editable Quantity & Dosage Badges */}
              <div className="med-visual-badges">
                {/* Quantity Input */}
                <div className="v-badge v-badge-dosage">
                  <Pill size={18} />
                  <input
                    type="text"
                    className="input-badge-text"
                    value={language === 'hi' ? med.dosageHi : med.dosageEn}
                    onChange={(e) =>
                      handleMedChange(
                        med.id,
                        language === 'hi' ? 'dosageHi' : 'dosageEn',
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Dosage & Timing Input */}
                <div className="v-badge v-badge-morning">
                  <Clock size={18} />
                  <input
                    type="text"
                    className="input-badge-text"
                    value={language === 'hi' ? med.frequencyHi : med.frequencyEn}
                    onChange={(e) =>
                      handleMedChange(
                        med.id,
                        language === 'hi' ? 'frequencyHi' : 'frequencyEn',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
