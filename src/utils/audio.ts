/**
 * Background Music Player for Digital Wedding Invitation
 * Supports custom MP3 audio URLs with automatic fallback to Web Audio API
 * synthesized melody so music always works even if network is offline or link fails.
 */

export interface SongPreset {
  id: string;
  title: string;
  artist: string;
  url: string;
  description: string;
}

export const PRESET_SONGS: SongPreset[] = [
  {
    id: 'until-i-found-you',
    title: 'Until I Found You (Official)',
    artist: 'Stephen Sanchez',
    url: '/until-i-found-you.mp3',
    description: 'Lagu romantis bernuansa retro 1950s yang sangat populer, manis dan hangat',
  },
  {
    id: 'until-i-found-you-piano',
    title: 'Until I Found You (Romantic Piano)',
    artist: 'Stephen Sanchez (Pianella Piano)',
    url: '/until-i-found-you-piano.mp3',
    description: 'Versi instrumen piano syahdu, elegan dan menyentuh hati untuk pernikahan',
  },
  {
    id: 'canon-in-d',
    title: 'Canon in D Major (Orchestral Strings)',
    artist: 'Johann Pachelbel',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Johann_Pachelbel_-_Canon_in_D_Major_-_Musopen.ogg',
    description: 'Klasik orkestra romantis dan khidmat untuk prosesi pernikahan',
  },
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune (Romantic Piano)',
    artist: 'Claude Debussy',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
    description: 'Alunan piano klasik yang sangat syahdu, lembut dan menenangkan',
  },
  {
    id: 'chopin-nocturne',
    title: 'Nocturne Op. 9 No. 2 (Sweet Piano)',
    artist: 'Frédéric Chopin',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Frederic_Chopin_-_Nocturne_Op_9_No_2_-_Musopen.ogg',
    description: 'Melodi piano romantis penuh kehangatan dan keanggunan',
  },
  {
    id: 'romantic-acoustic',
    title: 'Acoustic Love Guitar',
    artist: 'Acoustic Wedding',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-114227.mp3',
    description: 'Petikan gitar akustik hangat modern gaya indie pop pernikahan',
  },
  {
    id: 'gentle-piano',
    title: 'Romantic Piano Harmony',
    artist: 'Love Symphony',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77c30.mp3?filename=romantic-piano-124974.mp3',
    description: 'Piano solo romantis menyentuh hati',
  },
  {
    id: 'synth-bell',
    title: 'Kotak Musik Akustik (Bawaan Ringan)',
    artist: 'Instrumental Synth',
    url: '',
    description: 'Melodi kotak musik lembut bawaan yang ringan tanpa kuota internet',
  },
];

class RomanticWeddingSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private currentNote = 0;

  private melody = [
    293.66, 369.99, 440.0, 587.33, 440.0, 369.99,
    220.0, 277.18, 329.63, 440.0, 329.63, 277.18,
    246.94, 293.66, 369.99, 493.88, 369.99, 293.66,
    185.0, 220.0, 277.18, 369.99, 277.18, 220.0,
    196.0, 246.94, 293.66, 392.0, 293.66, 246.94,
    220.0, 293.66, 369.99, 440.0, 369.99, 293.66,
    196.0, 246.94, 293.66, 392.0, 293.66, 246.94,
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

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.95);

      this.timer = setTimeout(() => {
        this.playNext();
      }, 420);
    } catch {
      // Ignore
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

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

class WeddingAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private synth = new RomanticWeddingSynth();
  private currentUrl = '';
  private isPlaying = false;
  private isUsingSynth = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('error', () => {
        // If MP3 URL fails to load, fall back to soft synth
        if (this.isPlaying && !this.isUsingSynth) {
          console.warn('Audio URL failed to load, falling back to gentle synth melody.');
          this.isUsingSynth = true;
          this.synth.start();
        }
      });
    }
  }

  public setAudioUrl(url?: string) {
    const trimmed = (url || '').trim();
    if (trimmed === this.currentUrl) return;

    this.currentUrl = trimmed;

    if (this.audioElement) {
      if (trimmed) {
        this.audioElement.src = trimmed;
        this.audioElement.load();
      } else {
        this.audioElement.removeAttribute('src');
      }
    }

    // If currently playing, restart with new URL
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public start() {
    this.isPlaying = true;

    if (this.currentUrl && this.audioElement) {
      this.isUsingSynth = false;
      this.audioElement
        .play()
        .then(() => {
          // Playing successfully
        })
        .catch((err) => {
          console.warn('HTML5 Audio play rejected, falling back to synth:', err);
          this.isUsingSynth = true;
          this.synth.start();
        });
    } else {
      this.isUsingSynth = true;
      this.synth.start();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        // Ignore
      }
    }
    this.synth.stop();
    this.isUsingSynth = false;
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

export const weddingAudio = new WeddingAudioController();
