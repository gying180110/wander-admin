export const normalizeText = (input) => {
  if (typeof input !== 'string' || !input) return input

  // Try recovering text when UTF-8 bytes were decoded as Latin-1.
  try {
    const bytes = Uint8Array.from([...input].map((ch) => ch.charCodeAt(0) & 0xff))
    const decoded = new TextDecoder('utf-8').decode(bytes)
    if (decoded && decoded.includes('�') === false) {
      // Prefer decoded text when it contains common Chinese characters.
      if (/[\u4e00-\u9fa5]/.test(decoded)) return decoded
    }
  } catch (e) {
    // Ignore and fallback to original input.
  }

  return input
}
