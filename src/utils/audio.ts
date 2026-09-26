// Web Audio API Synthesizer for Retro & Futuristic Museum Soundscapes

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

const getContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playUiClick = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio restrictions
  }
};

export const playFuturisticChime = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.06, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.35);
    });
  } catch {
    // Ignore audio restrictions
  }
};

export const playDialUpSimulation = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Dial tone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const dialGain = ctx.createGain();

    osc1.frequency.setValueAtTime(350, now);
    osc2.frequency.setValueAtTime(440, now);
    dialGain.gain.setValueAtTime(0.08, now);
    dialGain.gain.setValueAtTime(0.08, now + 0.5);
    dialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc1.connect(dialGain);
    osc2.connect(dialGain);
    dialGain.connect(ctx.destination);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);

    // Handshake screech simulation
    const screechTime = now + 0.65;
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, screechTime);
    filter.Q.setValueAtTime(5, screechTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.07, screechTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, screechTime + 1.2);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(screechTime);
    noise.stop(screechTime + 1.2);

    // Connected dual ping
    const pingTime = screechTime + 1.25;
    const ping = ctx.createOscillator();
    const pingGain = ctx.createGain();
    ping.type = 'sine';
    ping.frequency.setValueAtTime(1200, pingTime);
    ping.frequency.setValueAtTime(2400, pingTime + 0.1);
    pingGain.gain.setValueAtTime(0.08, pingTime);
    pingGain.gain.exponentialRampToValueAtTime(0.001, pingTime + 0.3);

    ping.connect(pingGain);
    pingGain.connect(ctx.destination);
    ping.start(pingTime);
    ping.stop(pingTime + 0.3);
  } catch {
    // Ignore audio restrictions
  }
};
