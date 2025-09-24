class Cipher {
    massages = [];
    key = 1;

    constructor(massages = []) {
        this.massages = massages;
    }

    addMassage(massage) {
        this.massages.push(massage);
    }

    encodeAll(key=1) {// шифрування зсувом букви на 1, але лише букв латинського чи кириличного алфавіту
        return this.massages.map(massage => {
            return massage.split('').map(char => {
                if (char >= 'a' && char <= 'z') {
                    return char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + key);
                } else if (char >= 'A' && char <= 'Z') {
                    return char === 'Z' ? 'A' : String.fromCharCode(char.charCodeAt(0) + key);
                } else if (char >= 'а' && char <= 'я') {
                    return char === 'я' ? 'а' : String.fromCharCode(char.charCodeAt(0) + key);
                } else if (char >= 'А' && char <= 'Я') {
                    return char === 'Я' ? 'А' : String.fromCharCode(char.charCodeAt(0) + key);
                } else {
                    return char;
                }
            }).join('');
        });
    }

    decodeAll(key=1) {// дешифрування зсувом букви на 1, але лише букв латинського чи кириличного алфавіту
        return this.massages.map(massage => {
            return massage.split('').map(char => {
                if (char >= 'a' && char <= 'z') {
                    return char === 'a' ? 'z' : String.fromCharCode(char.charCodeAt(0) - key);
                } else if (char >= 'A' && char <= 'Z') {
                    return char === 'A' ? 'Z' : String.fromCharCode(char.charCodeAt(0) - key);
                } else if (char >= 'а' && char <= 'я') {
                    return char === 'а' ? 'я' : String.fromCharCode(char.charCodeAt(0) - key);
                } else if (char >= 'А' && char <= 'Я') {
                    return char === 'А' ? 'Я' : String.fromCharCode(char.charCodeAt(0) - key);
                } else {
                    return char;
                }
            }).join('');
        }); 
    }
}

// Function to initialize the DOM demo (only run when in browser)
function initializeDemo() {
    if (typeof document !== 'undefined') {
        // Приклад використання класу
        const cipher = new Cipher();
        cipher.addMassage("Hello, World!");
        cipher.addMassage("Привіт, Світ!");
        cipher.addMassage("Zebra and Zebra.");
        const originalMessages = cipher.massages;
        const encodedMessages = cipher.encodeAll(1);
        
        // Create a new cipher with encoded messages to decode them properly
        const encodedCipher = new Cipher(encodedMessages);
        const decodedMessages = encodedCipher.decodeAll(1);
        
        let originalElem = document.getElementById("original-messages");
        let encodedElem = document.getElementById("encoded-messages");
        let decodedElem = document.getElementById("decoded-messages");

        if (originalElem && encodedElem && decodedElem) {
            originalElem.innerText = "Original Messages: " + originalMessages.join(" | ");
            encodedElem.innerText = "Encoded Messages: " + encodedMessages.join(" | ");
            decodedElem.innerText = "Decoded Messages: " + decodedMessages.join(" | ");
        }
    }
}

// Auto-initialize when in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDemo);
    } else {
        initializeDemo();
    }
}


module.exports = { Cipher };