// Professional Sound Effects Utility for edgenOS
// Provides OS-like sound effects for various system events

// Create audio context when needed (to comply with autoplay policies)
let audioContext = null;

// Define AudioContext with fallback for older browsers
const AudioContextClass = window.AudioContext ||
  // @ts-ignore: webkitAudioContext is used for Safari compatibility
  window.webkitAudioContext;

// Initialize audio context on user interaction
const initAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new AudioContextClass();
    } catch (error) {
      console.error('Web Audio API is not supported in this browser', error);
    }
  }
  return audioContext;
};

// Create a filter for more professional sound
const createFilter = (context) => {
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2000;
  filter.Q.value = 1;
  return filter;
};

// Play a professional Windows-like success sound
export const playSuccess = () => {
  const context = initAudioContext();
  if (!context) return;

  try {
    // Create oscillators for a richer sound
    const oscillator1 = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = createFilter(context);

    // Configure oscillators
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';

    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(context.destination);

    // Windows-like success sound (two-note ascending)
    oscillator1.frequency.setValueAtTime(1046.5, context.currentTime); // C6
    oscillator1.frequency.setValueAtTime(1318.51, context.currentTime + 0.15); // E6

    oscillator2.frequency.setValueAtTime(523.25, context.currentTime); // C5
    oscillator2.frequency.setValueAtTime(659.25, context.currentTime + 0.15); // E5

    // Volume envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.15);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.5);

    // Play the sound
    oscillator1.start(context.currentTime);
    oscillator2.start(context.currentTime);
    oscillator1.stop(context.currentTime + 0.5);
    oscillator2.stop(context.currentTime + 0.5);
  } catch (error) {
    console.error('Error playing success sound', error);
  }
};

// Play a professional Windows-like error sound
export const playError = () => {
  const context = initAudioContext();
  if (!context) return;

  try {
    // Create oscillators for a richer sound
    const oscillator1 = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = createFilter(context);

    // Configure oscillators
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';

    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(context.destination);

    // Windows-like error sound (descending notes)
    oscillator1.frequency.setValueAtTime(784, context.currentTime); // G5
    oscillator1.frequency.setValueAtTime(587.33, context.currentTime + 0.15); // D5

    oscillator2.frequency.setValueAtTime(392, context.currentTime); // G4
    oscillator2.frequency.setValueAtTime(293.66, context.currentTime + 0.15); // D4

    // Volume envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.15);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.5);

    // Play the sound
    oscillator1.start(context.currentTime);
    oscillator2.start(context.currentTime);
    oscillator1.stop(context.currentTime + 0.5);
    oscillator2.stop(context.currentTime + 0.5);
  } catch (error) {
    console.error('Error playing error sound', error);
  }
};

// Play a professional OS-like click/UI interaction sound
export const playClick = () => {
  const context = initAudioContext();
  if (!context) return;

  try {
    // Create nodes
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filter = createFilter(context);

    // Configure oscillator
    oscillator.type = 'sine';

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(context.destination);

    // Professional UI click sound (short, subtle)
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, context.currentTime + 0.05);

    // Very short, subtle volume envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.07, context.currentTime + 0.005);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.07);

    // Play the sound
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.07);
  } catch (error) {
    console.error('Error playing click sound', error);
  }
};

// Play a professional notification/reward sound
export const playReward = () => {
  const context = initAudioContext();
  if (!context) return;

  try {
    // Create multiple oscillators for a richer sound
    const oscillator1 = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = createFilter(context);

    // Configure oscillators
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';

    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(context.destination);

    // Professional notification sound (similar to Windows 10 notification)
    // Two-note pleasant chime
    oscillator1.frequency.setValueAtTime(880, context.currentTime); // A5
    oscillator1.frequency.setValueAtTime(1174.66, context.currentTime + 0.15); // D6

    oscillator2.frequency.setValueAtTime(440, context.currentTime); // A4
    oscillator2.frequency.setValueAtTime(587.33, context.currentTime + 0.15); // D5

    // Volume envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, context.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.12, context.currentTime + 0.15);
    gainNode.gain.linearRampToValueAtTime(0.12, context.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.5);

    // Play the sound
    oscillator1.start(context.currentTime);
    oscillator2.start(context.currentTime);
    oscillator1.stop(context.currentTime + 0.5);
    oscillator2.stop(context.currentTime + 0.5);
  } catch (error) {
    console.error('Error playing reward sound', error);
  }
};

// Play a professional task complete sound (similar to Windows task complete)
export const playLevelComplete = () => {
  const context = initAudioContext();
  if (!context) return;

  try {
    // Create multiple oscillators for a richer sound
    const oscillator1 = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const oscillator3 = context.createOscillator();
    const gainNode = context.createGain();
    const filter = createFilter(context);

    // Configure oscillators
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';
    oscillator3.type = 'sine';

    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    oscillator3.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(context.destination);

    // Professional task complete sound (three-note pleasant chime)
    // Similar to Windows 10 task complete sound
    const notes1 = [
      { freq: 987.77, time: 0 },      // B5
      { freq: 1318.51, time: 0.15 },  // E6
      { freq: 1567.98, time: 0.3 }    // G6
    ];

    const notes2 = [
      { freq: 493.88, time: 0 },      // B4
      { freq: 659.25, time: 0.15 },   // E5
      { freq: 783.99, time: 0.3 }     // G5
    ];

    const notes3 = [
      { freq: 246.94, time: 0 },      // B3
      { freq: 329.63, time: 0.15 },   // E4
      { freq: 392.00, time: 0.3 }     // G4
    ];

    // Set frequencies for each oscillator
    notes1.forEach(note => {
      oscillator1.frequency.setValueAtTime(note.freq, context.currentTime + note.time);
    });

    notes2.forEach(note => {
      oscillator2.frequency.setValueAtTime(note.freq, context.currentTime + note.time);
    });

    notes3.forEach(note => {
      oscillator3.frequency.setValueAtTime(note.freq, context.currentTime + note.time);
    });

    // Volume envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.02);
    gainNode.gain.setValueAtTime(0.1, context.currentTime + 0.15);
    gainNode.gain.setValueAtTime(0.1, context.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.7);

    // Play the sound
    oscillator1.start(context.currentTime);
    oscillator2.start(context.currentTime);
    oscillator3.start(context.currentTime);
    oscillator1.stop(context.currentTime + 0.7);
    oscillator2.stop(context.currentTime + 0.7);
    oscillator3.stop(context.currentTime + 0.7);
  } catch (error) {
    console.error('Error playing task complete sound', error);
  }
};

// Enable vibration for mobile devices
export const vibrate = (pattern) => {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.error('Error with vibration API', error);
    }
  }
};

// Professional vibration patterns (more subtle)
export const VIBRATION_PATTERNS = {
  SUCCESS: [40],                  // Short single vibration for success
  ERROR: [30, 20, 30],            // Short pattern for error
  CLICK: [5],                     // Very subtle click feedback
  REWARD: [20, 15, 30],           // Subtle notification pattern
  LEVEL_COMPLETE: [40, 30, 60]    // Task complete pattern
};

export default {
  playSuccess,
  playError,
  playClick,
  playReward,
  playLevelComplete,
  vibrate,
  VIBRATION_PATTERNS
};
