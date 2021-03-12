import { enc as Enc, AES, lib as Lib } from 'crypto-js';
import _pbkdf2 from 'pbkdf2';

async function encrypt (value, key) {
  const keySalt = Enc.Hex.stringify(Lib.WordArray.random(16));
  const derivedKey = await _pbkdf2(key, keySalt);
  const rawEncryptedValue = AES.encrypt(value, derivedKey);
  return {
    encrypted: JsonFormatter.stringify(rawEncryptedValue),
    keySalt
  }
}

async function decrypt (encrypted, key, keySalt) {
  if (!keySalt) return false

  const encryptedValue = JsonFormatter.parse(encrypted)
  try {
    const derivedKey = await _pbkdf2(key, keySalt)
    const decryptedValue = AES.decrypt(encryptedValue, derivedKey)
    return decryptedValue.toString(Enc.Utf8)
  } catch (e) {
    return false
  }
}

export {
  encrypt,
  decrypt,
}