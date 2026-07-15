const encoder = new TextEncoder()
const decoder = new TextDecoder()

export type EncryptedPayload = Readonly<{
  ciphertext: string
  iv: string
  keyVersion: string
}>

function toBase64(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return copy.buffer
}

async function importEncryptionKey(encodedKey: string): Promise<CryptoKey> {
  const key = fromBase64(encodedKey)
  if (key.byteLength !== 32) throw new Error("PII_ENCRYPTION_KEY must be a base64-encoded 256-bit key")
  return crypto.subtle.importKey("raw", toArrayBuffer(key), "AES-GCM", false, ["encrypt", "decrypt"])
}

export async function encryptPayload(value: unknown, encodedKey: string, keyVersion: string): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await importEncryptionKey(encodedKey)
  const plaintext = encoder.encode(JSON.stringify(value))
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, key, toArrayBuffer(plaintext))
  return { ciphertext: toBase64(new Uint8Array(ciphertext)), iv: toBase64(iv), keyVersion }
}

export async function decryptPayload(payload: EncryptedPayload, encodedKey: string): Promise<unknown> {
  const key = await importEncryptionKey(encodedKey)
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: toArrayBuffer(fromBase64(payload.iv)) },
    key,
    toArrayBuffer(fromBase64(payload.ciphertext)),
  )
  return JSON.parse(decoder.decode(plaintext))
}
