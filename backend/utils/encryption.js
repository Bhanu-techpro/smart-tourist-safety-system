const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'a_default_32_character_secret_key'; // Must be 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Encrypts a piece of text.
 * @param {string} text - The text to encrypt.
 * @returns {string} - The encrypted text, formatted as iv:encryptedData.
 */
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts a piece of text.
 * @param {string} text - The encrypted text (iv:encryptedData).
 * @returns {string} - The decrypted text.
 */
function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// This file is a placeholder for a more robust encryption strategy.
// For example, passport numbers in the Tourist model should use these functions.
// e.g., tourist.passportNumber = encrypt(passportNumber);

module.exports = { encrypt, decrypt };
