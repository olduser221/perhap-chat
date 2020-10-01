const aesjs = require('aes-js')
const crypto = require('crypto')

module.exports = {

    key: null,

    generateKey: () => {
        return aesjs.utils.hex.fromBytes(crypto.randomFillSync(new Uint8Array(16)))
    },

    encrypt: (text) => {
        let aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(this.key), new aesjs.Counter(5))
        return aesjs.utils.hex.fromBytes(aesCtr.encrypt(aesjs.utils.utf8.toBytes(text)))
    },

    decrypt: (text) => {
        let aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(this.key), new aesjs.Counter(5))
        return aesjs.utils.utf8.fromBytes(aesCtr.decrypt(aesjs.utils.hex.toBytes(text)))
    },

    setKey: (newKey) => {
        this.key = newKey
    }

}