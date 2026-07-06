export const scrollState = {
  velocity: 0,
  lastY: typeof window !== 'undefined' ? window.scrollY : 0,
  // Helper to get normalized multiplier for 3D speed (e.g. 1 is normal, 10 is fast)
  getSpeedMultiplier: () => {
    // map velocity (0 to 100) to a multiplier (1 to 15)
    const absVel = Math.abs(scrollState.velocity);
    const multiplier = 1 + (Math.min(absVel, 100) / 100) * 14;
    return multiplier;
  }
}
