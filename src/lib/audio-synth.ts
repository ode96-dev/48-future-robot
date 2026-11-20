class ExhibitionAudioService {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playClick() {
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Autoplay policy fallback
    }
  }

  playFocusChime() {
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        554.37,
        ctx.currentTime + 0.14,
      );

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Autoplay policy fallback
    }
  }

  toggleAmbient(enable?: boolean): boolean {
    try {
      const ctx = this.ensureContext();
      if (!ctx) return false;

      const target = enable !== undefined ? enable : !this.isAmbientPlaying;

      if (target && !this.isAmbientPlaying) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(65.41, ctx.currentTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(98.0, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(160, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        this.ambientOsc1 = osc1;
        this.ambientOsc2 = osc2;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      }

      if (!target && this.isAmbientPlaying) {
        if (this.ambientGain) {
          this.ambientGain.gain.linearRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.6,
          );
        }
        const o1 = this.ambientOsc1;
        const o2 = this.ambientOsc2;
        this.isAmbientPlaying = false;
        setTimeout(() => {
          try {
            o1?.stop();
            o2?.stop();
          } catch {
            // Already stopped
          }
        }, 650);
        return false;
      }
      return this.isAmbientPlaying;
    } catch {
      return false;
    }
  }

  speakNarration(text: string, onEnd?: () => void): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return false;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 0.98;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }
      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      return false;
    }
  }

  stopNarration() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundFx = new ExhibitionAudioService();
