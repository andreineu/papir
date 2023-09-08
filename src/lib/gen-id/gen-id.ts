export function generateUId() {
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);

  const secureUniqueId = Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return secureUniqueId;
}
