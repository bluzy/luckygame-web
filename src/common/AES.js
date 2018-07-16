import crypto from 'crypto';

class AES {

    static encode_regex = /[+=/]/g;
    static decode_regex = /[._-]/g;

    static key = "123ikjnasdlkfnalskdjf";

    static encrypt(val) {
        const cipher = crypto.createCipher('aes-256-cbc', this.key);
        let result = cipher.update(val, 'utf8', 'base64');
        result += cipher.final('base64');

        return result.replace(this.encode_regex, this.encodeChar);
    }

    static decrypt(val) {
        const decipher = crypto.createDecipher('aes-256-cbc', this.key);
        let result = decipher.update(val.replace(this.decode_regex, this.decodeChar), 'base64', 'utf8');
        result += decipher.final('utf8');
        
        return result;
    }

    static encodeChar(c) {
        switch (c) {
            case '+': return '.';
            case '=': return '-';
            case '/': return '_';
            default: return c;
        }
    }

    static decodeChar(c) {
        switch (c) {
            case '.': return '+';
            case '-': return '=';
            case '_': return '/';
            default: return c;
        }
    }
}

export default AES;