/**
 * Background Music Player for Digital Wedding Invitation
 * Supports gentle romantic melody using Web Audio API so it plays instantly
 * without external network lag, CORS issues, or broken links.
 */

class RomanticWeddingSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private currentNote = 0;

  // Romantic Pentatonic Chord Arpeggio progression (Canon in D / Wedding theme style)
  private melody = [
    // Chord 1 (D / F# / A)
    293.66, 369.99, 440.0, 587.33, 440.0, 369.99,
    // Chord 2 (A / C# / E)
    220.0, 277.18, 329.63, 440.0, 329.63, 277.18,
    // Chord 3 (Bm / D / F#)
    246.94, 293.66, 369.99, 493.88, 369.99, 293.66,
    // Chord 4 (F#m / A / C#)
    185.0, 220.0, 277.18, 369.99, 277.18, 220.0,
    // Chord 5 (G / B / D)
    196.0, 246.94, 293.66, 392.0, 293.66, 246.94,
    // Chord 6 (D / F# / A)
    220.0, 293.66, 369.99, 440.0, 369.99, 293.66,
    // Chord 7 (G / B / D)
    196.0, 246.94, 293.66, 392.0, 293.66, 246.94,
    // Chord 8 (A / C# / E)
    220.0, 277.18, 329.63, 440.0, 329.63, 277.18,
  ];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.playNext();
    } catch {
      // Audio not supported
    }
  }

  private playNext() {
    if (!this.isPlaying || !this.ctx) return;

    try {
      const freq = this.melody[this.currentNote % this.melody.length];
      this.currentNote++;

      // Create gentle music-box / acoustic tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope: soft pluck, gentle decay
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.95);

      this.timer = setTimeout(() => {
        this.playNext();
      }, 420);
    } catch {
      // Ignore audio glitch
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // Ignore
      }
      this.ctx = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new RomanticWeddingSynth();
