import { DecodedPrescription, TargetLanguage } from '../types/prescription';

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  voiceName?: string;
  onBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export class TTSService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static voices: SpeechSynthesisVoice[] = [];

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public static initVoiceList(callback: (voices: SpeechSynthesisVoice[]) => void) {
    if (!this.synth) return;
    const load = () => {
      this.voices = this.synth!.getVoices();
      callback(this.voices);
    };
    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  public static generatePrescriptionScript(prescription: DecodedPrescription, lang: TargetLanguage): string {
    if (lang === 'hi') {
      let text = `दवाइयां और उनकी खुराक: `;
      prescription.medicines.forEach((med, idx) => {
        text += `दवा ${idx + 1}: ${med.nameHi}। मात्रा: ${med.dosageHi}। खुराक: ${med.frequencyHi}, ${med.timingHi}। `;
      });
      return text;
    } else {
      let text = `Prescribed medicines and dosages: `;
      prescription.medicines.forEach((med, idx) => {
        text += `Medicine ${idx + 1}: ${med.nameEn}. Quantity: ${med.dosageEn}. Dosage: ${med.frequencyEn}, ${med.timingEn}. `;
      });
      return text;
    }
  }

  public static speak(
    text: string,
    lang: TargetLanguage,
    options: TTSOptions = {}
  ): boolean {
    if (!this.synth) return false;

    this.stop(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1.0;

    const voices = this.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (options.voiceName) {
      selectedVoice = voices.find((v) => v.name === options.voiceName);
    }

    if (!selectedVoice) {
      if (lang === 'hi') {
        selectedVoice = voices.find(
          (v) => v.lang.startsWith('hi') || v.name.includes('Hindi') || v.name.includes('India')
        );
      } else {
        selectedVoice = voices.find(
          (v) => v.lang.startsWith('en-IN') || v.lang.startsWith('en')
        );
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

    utterance.onboundary = (evt) => {
      if (options.onBoundary) {
        options.onBoundary(evt.charIndex);
      }
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (err) => {
      this.currentUtterance = null;
      if (options.onError) options.onError(err);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public static pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}
