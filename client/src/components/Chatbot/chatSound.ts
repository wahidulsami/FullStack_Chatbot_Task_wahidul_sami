let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  try {
    const Ctor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioContext ??= new Ctor()
    if (audioContext.state === "suspended") void audioContext.resume()
    return audioContext
  } catch {
    return null
  }
}

export function resumeAudioContext() {
  const ctx = getContext()
  if (ctx && ctx.state === "suspended") {
    void ctx.resume()
  }
}

/** Short gentle two-note chime for incoming/bot message and welcome preview. Returns false if blocked. */
export function playChatChime(): boolean {
  const ctx = getContext()
  if (!ctx) return false

  try {
    if (ctx.state === "suspended") {
      void ctx.resume()
    }
    const start = ctx.currentTime
    const notes = [880, 1174.66] // A5, D6

    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      const noteStart = start + index * 0.13

      oscillator.type = "sine"
      oscillator.frequency.value = frequency

      gain.gain.setValueAtTime(0.0001, noteStart)
      gain.gain.exponentialRampToValueAtTime(0.05, noteStart + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.32)

      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start(noteStart)
      oscillator.stop(noteStart + 0.35)
    })

    return ctx.state !== "suspended"
  } catch {
    return false
  }
}

/** Subtle outgoing pop when user sends a message. */
export function playMessageSentSound(): boolean {
  const ctx = getContext()
  if (!ctx) return false

  try {
    if (ctx.state === "suspended") {
      void ctx.resume()
    }
    const start = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(600, start)
    osc.frequency.exponentialRampToValueAtTime(900, start + 0.08)

    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.025, start + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.1)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.12)

    return true
  } catch {
    return false
  }
}
