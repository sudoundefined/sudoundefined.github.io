import { useEffect, useRef } from 'react'

interface AudioEngineProps {
  enabled: boolean
}

// Global audio context so we don't recreate it
let audioCtx: AudioContext | null = null;
let droneGainNode: GainNode | null = null;
let droneOscillator: OscillatorNode | null = null;
let filterNode: BiquadFilterNode | null = null;

export const playBlip = (frequency = 800, type: OscillatorType = 'sine', duration = 0.05, volume = 0.1) => {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  
  // Envelope
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export const playHoverSound = () => {
  playBlip(600, 'sine', 0.1, 0.05);
}

export const playClickSound = () => {
  playBlip(1200, 'square', 0.15, 0.03);
  setTimeout(() => playBlip(1800, 'sine', 0.1, 0.05), 50);
}

const AudioEngine = ({ enabled }: AudioEngineProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (enabled && !initialized.current) {
      // Initialize Web Audio API
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtx && AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
      
      if (!audioCtx) return;
      
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Setup Drone
      if (!droneOscillator) {
        droneOscillator = audioCtx.createOscillator();
        droneOscillator.type = 'sawtooth';
        droneOscillator.frequency.value = 55; // Low C drone

        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 400; // Muffle it
        filterNode.Q.value = 2;

        droneGainNode = audioCtx.createGain();
        droneGainNode.gain.value = 0; // Start silent

        droneOscillator.connect(filterNode);
        filterNode.connect(droneGainNode);
        droneGainNode.connect(audioCtx.destination);
        
        droneOscillator.start();
      }

      // Fade in drone
      if (droneGainNode && audioCtx) {
        droneGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        droneGainNode.gain.setValueAtTime(droneGainNode.gain.value, audioCtx.currentTime);
        droneGainNode.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 2); // Very quiet
      }

      initialized.current = true;
    } else if (!enabled && initialized.current) {
      // Fade out drone
      if (droneGainNode && audioCtx) {
        droneGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        droneGainNode.gain.setValueAtTime(droneGainNode.gain.value, audioCtx.currentTime);
        droneGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
      }
      initialized.current = false;
    }

    return () => {
      // We don't fully destroy the context on unmount so sounds can play across renders
    }
  }, [enabled]);

  // Modulate drone based on scroll to add dynamic feel
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (!audioCtx || !filterNode || !enabled) return;
      
      // Calculate scroll percentage
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Map scroll to filter frequency (300Hz to 800Hz)
      const targetFreq = 300 + (scrollPercent * 500);
      filterNode.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled]);

  return null; // This is a logic-only component
}

export default AudioEngine
