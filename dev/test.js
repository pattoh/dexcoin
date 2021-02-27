const Blockchain = require('./blockchain');
const dexcoin = new Blockchain();
const Mychain = {
    "chain": [
        {
        "index": 1,
        "timestamp": 1525295039150,
        "transactions": [],
        "nonce": 100,
        "hash": "0",
        "previousBlockHash": "0"
        },
        {
        "index": 2,
        "timestamp": 1525295064849,
        "transactions": [],
        "nonce": 18140,
        "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
        "previousBlockHash": "0"
        },
        {
        "index": 3,
        "timestamp": 1525295150900,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "555dc5d04e4c11e89b44174d1b876bbf",
        "transactionId": "64b4c6504e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 10,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "881441704e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 20,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "8c835b604e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 30,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "92c6e7304e4c11e89b44174d1b876bbf"
        }
        ],
        "nonce": 59137,
        "hash": "0000c09685e31e57318e569b5fe3ca88ced727a29a0eb9cbea633e05056b4c29",
        "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
        "index": 4,
        "timestamp": 1525295192141,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "555dc5d04e4c11e89b44174d1b876bbf",
        "transactionId": "97fa3b804e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 40,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "a5d523504e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 50,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "a8b55fe04e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 60,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "ab0347804e4c11e89b44174d1b876bbf"
        },
        {
        "amount": 70,
        "sender": "NNFANSDFHYHTN90A09SNFAS",
        "recipient": "IUW099N0A90WENNU234UFAW",
        "transactionId": "ad9738d04e4c11e89b44174d1b876bbf"
        }
        ],
        "nonce": 16849,
        "hash": "00001f3f4e1635cc930cdc41a954d19bcf457eeba8bf6c7be7aa4fe1489e64d3",
        "previousBlockHash": "0000c09685e31e57318e569b5fe3ca88ced727a29a0eb9cbea633e05056b4c29"
        },
        {
        "index": 5,
        "timestamp": 1525295206369,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "555dc5d04e4c11e89b44174d1b876bbf",
        "transactionId": "b08f1c104e4c11e89b44174d1b876bbf"
        }
        ],
        "nonce": 40153,
        "hash": "000067295fb567842799b887910fe31cc8ca7544ec15a000b65005f6ac50df21",
        "previousBlockHash": "00001f3f4e1635cc930cdc41a954d19bcf457eeba8bf6c7be7aa4fe1489e64d3"
        },
        {
        "index": 6,
        "timestamp": 1525295212959,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "555dc5d04e4c11e89b44174d1b876bbf",
        "transactionId": "b90a6f704e4c11e89b44174d1b876bbf"
        }
        ],
        "nonce": 252386,
        "hash": "0000462c88b2814ebb930b13ac3c19dc698b2dca27b0c296e03f8a2ea104f74f",
        "previousBlockHash": "000067295fb567842799b887910fe31cc8ca7544ec15a000b65005f6ac50df21"
        }
        ],
        "pendingTransactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "555dc5d04e4c11e89b44174d1b876bbf",
        "transactionId": "bcf84b704e4c11e89b44174d1b876bbf"
        }
        ],
        "currentNodeUrl": "http://localhost:3001",
        "networkNodes": []
        };


console.log('VALID:' , dexcoin.chainIsValid(Mychain.chain));




































//const dexcoin = new Blockchain();




























































//const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';
//const nonce = 80126;
//const currentBlockData = [
    //{
       //amount: 10,
        //sender: 'B4CEE9C0E5CD571',
        //recipient: '3A3F6E462D48E9',

        //amount: 11,
        //sender: 'B4CEE9C0E8CD523',
        //recipient: '3A3F6E462D32E9',

        //amount: 12,
        //sender: 'B4CDD9C0E8CD523',
        //recipient: '3A3F6E4W2D32E9',
    //}
//]
//dexcoin.hashBlock(previousBlockHash, currentBlockData );





































//dexcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');
//dexcoin.createNewBlock(2390,'OIUOEREDHKHKD','78s97d4x6dsf');
//dexcoin.createNewBlock(2391,'OIUOEREDHKHKD','78s97d4x6dsf');
//dexcoin.createNewBlock(2392,'OIUOEREDHKHKD','78s97d4x6dsf');

//dexcoin.createNewBlock(789457,'OIUOEDJETH8754DHKD','78SHNEG45DER56');

//dexcoin.createNewTransaction(100,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
//dexcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');
//dexcoin.createNewTransaction(50,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
//dexcoin.createNewTransaction(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
//dexcoin.createNewTransaction(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');


//dexcoin.createNewBlock(23000,'OIUOEDJETH8754DHKD','78SHNEG45DER56');

//ghnghngn 
