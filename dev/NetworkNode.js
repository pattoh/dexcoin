var express = require('express')
var app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
const port = process.argv[2];
const dexcoin = new Blockchain();
const rp = require('request-promise');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function(req, res) {
    res.send(dexcoin)

});
app.post('/transaction', function(req, res){
    //res.json({note: 'Transaction will be added in block $(blockIndex).'});

    const newTransaction = req.body;
    const blockIndex = dexcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({note: 'Transaction will be added in block $(blockIndex).'});

});
app.get('/mine', function(req, res){
    //const newBlock = dexcoin.createNewBlock();
    const lastBlock = dexcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: dexcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    
    };
    const nonce = dexcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = dexcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = dexcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    const requestPromises = [];
    dexcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: { newBlock: newBlock},
            json:true
        };
       requestPromises.push(rp(requestOptions));
    })

    Promise.all(requestPromises)
    .then(data =>{
       const requestOptions = {
            uri: dexcoin.currentNodeUrl + '/transactionbroadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender: "00",
                recipient: nodeAddress
                
            },
           json:true
            
        };
        return rp(requestOptions);
    })
    //.then(data => {
    //    res.json({
    //    note: "New block mined successfully",
    //    block: newBlock
    //    });
    //});
    //dexcoin.createNewTransaction(12.5, "00", nodeAddress);
});

app.post('receive-new-block', function(res,req){
    const newBlock = req.body.newBlock;
    const lastBlock = dexcoin.getLastBlock();
    lastBlock.hash === newBlock.previousBlockHash;
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

    if (correctHash && correctIndex){
        dexcoin.chain.push(newBlock);
    
    dexcoin.pendingTransactions = [];
    res.json({
        note: 'New block received and accepted',
        newBlock: newBlock
    })
    }
    else{
        res.json({
            note: 'New Block rejected',
            newBlock: newBlock
        });
    }
});

//create a node and broadcast it
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    //dexcoin.networkNodes.push(newNodeUrl);
    if (dexcoin.networkNodes.indexOf(newNodeUrl) == -1)
        dexcoin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    dexcoin.networkNodes.forEach(networkNodeUrl => {
        //... '/register-node'
        
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true,
            //rp(requestOptions)
        };
        regNodesPromises.push(rp(requestOptions));
    
    });
    Promise.all(regNodesPromises)   
    .then(data => {
        //use the data...
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworkNodes: [...dexcoin.networkNodes,
            dexcoin.currentNodeUrl]},
            json: true
        }
        return rp(bulkRegisterOptions);
        
    })
    .then (data => {
        res.json({ note: 'New Node Registered with Network Successfully'});

    });
        
});
    
//register a node with the network
app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
        const nodeNotAlreadyPresent = 
            dexcoin.networkNodes.indexOf(newNodeUrl) == -1;
        const notCurrentNode = dexcoin.currentNodeUrl !== newNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode ) dexcoin.networkNodes.push(newNodeUrl);
    dexcoin.networkNodes.push(newNodeUrl);
    res.json({note: 'New node registered successfully.'});



});

app.post('/register-nodes-bulk', function(req, res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        dexcoin.networkNodes.push(networkNodeUrl);
    const nodeNotAlreadyPresent =
        dexcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = dexcoin.currentNodeUrl !==networkNodeUrl;

if(nodeNotAlreadyPresent && notCurrentNode)dexcoin.networkNodes.push(networkNodeUrl);
    });
res.json({note: 'Bulk registration successful.'});

});


app.post('/consensus', function(req, res){
    const requestPromises = [];
    dexcoin.networkNodes.forEach(newworkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
            json: true
        }
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
    .then(blockchains =>{
        const currentChainLength = dexcoin.chain.length;
        let maxChainLength = currentChainLength;
        let newLongestChain = null;
        let newPendingTransactions = null;
        blockchains.forEach(blockchain =>{
            if (blockchain.chain.length > maxChainLength) {
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
                if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
                    res.json({
                        note: 'Current chain has not been replaced',
                        chain: dexcoin.chain
                    });
                }
                else{
                    dexcoin.chain = newLongestChain;
                    dexcoin.pendingTransactions = newPendingTransactions;
                    res.json({
                        note: 'This chain has been replaced,',
                        chain: dexcoin.chain
                    });
                }

            };
        });

    });
    
});

app.get('/block/:blockHash', function(req, res){
    const blockHash = req.params.blockHash;
    const correctBlock = dexcoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });

});




app.get('/transaction/:transactionId', function(req, res){
    const transactionId = req.params.transactionId;
    const transactionData = dexcoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block
    });

});




app.get('/address/:address', function(req, res){
    const address = req.params.address;
    const addressData = dexcoin.getAddressData(address);
    res.json({
        addressData: addressData
    });

});





app.post('/transactionbroadcast', function(req, res) {
    const newTransaction = dexcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    dexcoin.addTransactionToPendingTransactions(newTransaction);
    
    const requestPromises = [];
    
    

    dexcoin.networkNodes.forEach(networkNodeUrl => {
        //...
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json:true
        };
        requestPromises.push(rp(requestOptions));
    
    });
    Promise.all(requestPromises)
    .then(data =>{
        res.json({note: 'Transaction created and broadcasted sucessfully'});


});
});

app.get('/block-explorer', function(req, res){
    res.sendFile('./block-explorer/index.html', { root: __dirname });


});

app.listen(port, function(){
    console.log('listening on port $(port)...');
});