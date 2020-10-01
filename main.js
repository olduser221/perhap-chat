#!/usr/bin/env node

const getPort = require('get-port');
const myRL = require("serverline");
const ngrok = require('ngrok');

const enc = require('./src/encryption');
const socket = require('./src/socket');

let port, url, id, key, name;

process.stdout.write("\x1Bc")
console.log(Array(process.stdout.rows + 1).join('\n'))

if (process.argv[2] == undefined) {
    process.exit(0)
}

myRL.init('Me: ')
myRL.question('What is your name? ', (answer) => {
    name = answer
    socket.name = name
    main()
})

myRL.on('line', function(line) {
    if (process.argv[2] === "join") {
        socket.send("join", {"name": name, "msg": enc.encrypt(line)})
    } else {
        socket.send("create", {"name": name, "msg": enc.encrypt(line)})
    }
})

async function main () {

    // process.stdout.write("\x1Bc")
    // console.log(Array(process.stdout.rows + 1).join('\n'))

    if (process.argv[2] !== undefined) {

        if (process.argv[2] === "create") {

            port = await getPort();
            url = await ngrok.connect(port)
            id = url.split(".")[0].replace("https://", "")
            key = enc.generateKey()
            
            enc.setKey(key)
            socket.create(port)
            console.log("[INFO] Share your ID with friends:", key + id)

        } else if (process.argv[2] === "join") {

            id = process.argv[3].substring(32, process.argv[3].length)
            key = process.argv[3].replace(id, '')
            
            enc.setKey(key)
            socket.join(id)

        } else {
            process.exit(1)
        }

    } else {
        process.exit(0)
    }

}