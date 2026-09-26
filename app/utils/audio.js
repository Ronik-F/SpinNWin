// Web Audio API procedural sound synthesizer (Zero external dependencies)
let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTickSound(isMuted = false, pitch = 1.0) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    // Mechanical click pitch
    const baseFreq = 520 * pitch;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Graceful fallback if audio is not allowed yet
  }
}

export function playWhooshSound(isMuted = false) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.4);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.9);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  } catch {
    // Ignore
  }
}

export function playWinFanfare(isMuted = false) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Victory fanfare notes: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.12);

      const noteStart = startTime + idx * 0.12;
      const noteDuration = idx === notes.length - 1 ? 0.8 : 0.22;

      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + noteDuration + 0.05);
    });
  } catch {
    // Ignore
  }
}

export function playYayyy(isMuted = false) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // ── Layer 1: Rising "Yayyy!" pitch sweep (crowd cheer feel) ──────────────
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.type = "sine";
    sweep.frequency.setValueAtTime(320, t);
    sweep.frequency.linearRampToValueAtTime(880, t + 0.18);
    sweep.frequency.exponentialRampToValueAtTime(1040, t + 0.45);
    sweepGain.gain.setValueAtTime(0, t);
    sweepGain.gain.linearRampToValueAtTime(0.28, t + 0.06);
    sweepGain.gain.setValueAtTime(0.28, t + 0.38);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, t + 1.05);
    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweep.start(t);
    sweep.stop(t + 1.1);

    // ── Layer 2: Bright sparkle arpeggio (C5 → E5 → G5 → C6 → E6) ──────────
    const arpNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    arpNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const noteT = t + i * 0.075;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, noteT);
      g.gain.setValueAtTime(0, noteT);
      g.gain.linearRampToValueAtTime(0.22, noteT + 0.025);
      g.gain.exponentialRampToValueAtTime(0.001, noteT + (i === arpNotes.length - 1 ? 0.9 : 0.18));
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(noteT);
      osc.stop(noteT + 1.0);
    });

    // ── Layer 3: Big sustained winner chord at 0.35s (C maj: C5+E5+G5) ──────
    const chordNotes = [523.25, 659.25, 783.99, 1046.5];
    const chordT = t + 0.38;
    chordNotes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, chordT);
      g.gain.setValueAtTime(0, chordT);
      g.gain.linearRampToValueAtTime(0.12, chordT + 0.04);
      g.gain.setValueAtTime(0.12, chordT + 0.55);
      g.gain.exponentialRampToValueAtTime(0.001, chordT + 1.1);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(chordT);
      osc.stop(chordT + 1.2);
    });

    // ── Layer 4: Punchy kick-like bass thump ──────────────────────────────────
    const kick = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kick.type = "sine";
    kick.frequency.setValueAtTime(180, t);
    kick.frequency.exponentialRampToValueAtTime(40, t + 0.18);
    kickGain.gain.setValueAtTime(0.5, t);
    kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    kick.connect(kickGain);
    kickGain.connect(ctx.destination);
    kick.start(t);
    kick.stop(t + 0.25);
  } catch {
    // Ignore
  }
}

/**
 * 👑 GRAND DOUBLE WINNER CELEBRATION FANFARE
 * Ultra-high fidelity procedural Web Audio:
 * - Multi-harmonic royal brass horns (Root, 3rd, 5th, Octave, 10th)
 * - Sparkling twin arpeggio glissando
 * - Crowd cheer / celebration white noise synthesis with bandpass filter
 * - Deep festive sub-bass impacts
 */
export function playGrandDoubleWinFanfare(isMuted = false) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // ── Layer 1: Sub-bass celebration boom ─────────────────────────────────
    const boom = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boom.type = "sine";
    boom.frequency.setValueAtTime(140, t);
    boom.frequency.exponentialRampToValueAtTime(32, t + 0.6);
    boomGain.gain.setValueAtTime(0.65, t);
    boomGain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
    boom.connect(boomGain);
    boomGain.connect(ctx.destination);
    boom.start(t);
    boom.stop(t + 0.9);

    // ── Layer 2: Trumpet / Horn Fanfare Chords ──────────────────────────────
    // Chord 1: G Maj (G4, B4, D5) at 0.05s
    // Chord 2: C Maj (C5, E5, G5, C6) at 0.35s
    // Chord 3: Grand Royal Fanfare (C5, G5, C6, E6, G6) sustained at 0.75s
    const fanfareProgression = [
      { time: t + 0.05, notes: [392.0, 493.88, 587.33], dur: 0.22, vol: 0.16 },
      { time: t + 0.32, notes: [523.25, 659.25, 783.99], dur: 0.28, vol: 0.18 },
      {
        time: t + 0.68,
        notes: [523.25, 659.25, 783.99, 1046.5, 1318.51],
        dur: 1.8,
        vol: 0.22,
      },
    ];

    fanfareProgression.forEach(({ time, notes, dur, vol }) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, time);

        // Lowpass filter for warm brass character
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(freq * 3.2, time);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + dur);

        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(vol, time + 0.04);
        g.gain.setValueAtTime(vol * 0.85, time + dur * 0.6);
        g.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + dur + 0.05);
      });
    });

    // ── Layer 3: Sparkling Chime Glissando (Tihar festival light sparkle) ──
    const sparkleNotes = [
      523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0,
    ];
    sparkleNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const st = t + 0.7 + idx * 0.06;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, st);

      g.gain.setValueAtTime(0, st);
      g.gain.linearRampToValueAtTime(0.18, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.65);

      osc.connect(g);
      g.connect(ctx.destination);

      osc.start(st);
      osc.stop(st + 0.7);
    });

    // ── Layer 4: Procedural Crowd Cheer / Festive Whoosh ───────────────────
    const bufferSize = ctx.sampleRate * 2.2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const cheerFilter = ctx.createBiquadFilter();
    cheerFilter.type = "bandpass";
    cheerFilter.frequency.setValueAtTime(1100, t + 0.6);
    cheerFilter.Q.setValueAtTime(1.8, t + 0.6);

    const cheerGain = ctx.createGain();
    cheerGain.gain.setValueAtTime(0, t + 0.6);
    cheerGain.gain.linearRampToValueAtTime(0.12, t + 0.95);
    cheerGain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

    whiteNoise.connect(cheerFilter);
    cheerFilter.connect(cheerGain);
    cheerGain.connect(ctx.destination);

    whiteNoise.start(t + 0.6);
    whiteNoise.stop(t + 2.5);
  } catch {
    // Ignore audio playback errors if user hasn't interacted
  }
}

