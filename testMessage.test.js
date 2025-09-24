const { Cipher } = require('./main'); // Import Cipher class from main.js

describe('Cipher class', () => {
    test('should create a Cipher instance with correct properties', () => {
        const cipher = new Cipher();
        expect(cipher.massages).toEqual([]);
    });

    test('should create a Cipher instance with initial messages', () => {
        const cipher = new Cipher(["Hello", "Привіт"]);
        expect(cipher.massages).toEqual(["Hello", "Привіт"]);
    });

    test('should add a message', () => {
        const cipher = new Cipher();
        cipher.addMassage("Hello");
        expect(cipher.massages).toContain("Hello");
        expect(cipher.massages.length).toBe(1);
    });

    test('should add multiple messages', () => {
        const cipher = new Cipher();
        cipher.addMassage("Hello");
        cipher.addMassage("World");
        expect(cipher.massages).toEqual(["Hello", "World"]);
    });

    test('should encode all messages with default key', () => {
        const cipher = new Cipher(["Hello", "World"]);
        const encoded = cipher.encodeAll();
        expect(encoded).toEqual(["Ifmmp", "Xpsme"]);
    });

    test('should encode all messages with custom key', () => {
        const cipher = new Cipher(["Hello"]);
        const encoded = cipher.encodeAll(2);
        expect(encoded).toEqual(["Jgnnq"]);
    });

    test('should encode Cyrillic messages', () => {
        const cipher = new Cipher(["Привіт"]);
        const encoded = cipher.encodeAll(1);
        expect(encoded).toEqual(["Рсйгіу"]);
    });

    test('should decode all messages with default key', () => {
        const cipher = new Cipher(["Ifmmp", "Xpsme"]);
        const decoded = cipher.decodeAll();
        expect(decoded).toEqual(["Hello", "World"]);
    });

    test('should decode all messages with custom key', () => {
        const cipher = new Cipher(["Jgnnq"]);
        const decoded = cipher.decodeAll(2);
        expect(decoded).toEqual(["Hello"]);
    });

    test('should decode Cyrillic messages', () => {
        const cipher = new Cipher(["Рсйгіу"]);
        const decoded = cipher.decodeAll(1);
        expect(decoded).toEqual(["Привіт"]);
    });

    test('should handle mixed case letters', () => {
        const cipher = new Cipher(["HeLLo"]);
        const encoded = cipher.encodeAll(1);
        expect(encoded).toEqual(["IfMMp"]);
    });

    test('should preserve non-alphabetic characters', () => {
        const cipher = new Cipher(["Hello, World!"]);
        const encoded = cipher.encodeAll(1);
        expect(encoded).toEqual(["Ifmmp, Xpsme!"]);
    });

    test('should handle edge case with z and Z', () => {
        const cipher = new Cipher(["z", "Z"]);
        const encoded = cipher.encodeAll(1);
        expect(encoded).toEqual(["a", "A"]);
    });

    test('should handle edge case with a and A in decoding', () => {
        const cipher = new Cipher(["a", "A"]);
        const decoded = cipher.decodeAll(1);
        expect(decoded).toEqual(["z", "Z"]);
    });

    test('should encode and decode be reversible', () => {
        const originalMessages = ["Hello, World!", "Привіт, Світ!", "Test123"];
        const cipher = new Cipher(originalMessages);
        const encoded = cipher.encodeAll(1);
        
        const decodeCipher = new Cipher(encoded);
        const decoded = decodeCipher.decodeAll(1);
        
        expect(decoded).toEqual(originalMessages);
    });
});
        