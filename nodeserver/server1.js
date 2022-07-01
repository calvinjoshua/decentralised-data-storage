const express = require('express');

const Web3 = require('web3');

const cors = require('cors');

const app = express();

const axios = require('axios');

const Tx = require('ethereumjs-tx').Transaction;

const web3 = new Web3('https://polygon-mumbai.g.alchemy.com/v2/8a2eo2U6B_bubyOOhWe8zgzPGTDqwbU0'); //This rpc wont allow us to only serach blocks with limit 5000, transactionHistory api will not get anything. Need a third party or own node to support this

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"rid","type":"uint256"},{"indexed":false,"internalType":"string","name":"data","type":"string"}],"name":"Certificate","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Details","outputs":[{"internalType":"uint256","name":"registrationNumber","type":"uint256"},{"internalType":"string","name":"metadata","type":"string"},{"internalType":"bool","name":"revoked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rid","type":"uint256"},{"internalType":"string","name":"cId","type":"string"},{"internalType":"string","name":"Mdata","type":"string"}],"name":"addCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"certs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ids","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_cId","type":"string"}],"name":"ratify","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_cId","type":"string"}],"name":"revoke","outputs":[],"stateMutability":"nonpayable","type":"function"}]
//const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "rid", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "data", "type": "string" }], "name": "Certificate", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "Details", "outputs": [{ "internalType": "uint256", "name": "registrationNumber", "type": "uint256" }, { "internalType": "string", "name": "metadata", "type": "string" }, { "internalType": "bool", "name": "revoked", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "rid", "type": "uint256" }, { "internalType": "string", "name": "cId", "type": "string" }, { "internalType": "string", "name": "Mdata", "type": "string" }], "name": "addCertificate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "", "type": "string" }], "name": "certs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "ratify", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "string", "name": "_cId", "type": "string" }], "name": "revoke", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const address = '0x1f6cE736A10193362803DCA8663BaA6e38f895a4'//'0x5b5de7Aed2562c21fEBe49C18B564858B2E2B22e'

const account1 = '0x92b508777377412ff8BC08A299c8770DE2f57B08'// '0x49DB91dCd647054f5AFB3651864Bca58e328e0f0'
const account2 = '0x376cd2115183Acbf767b56224350fdE46b23182C'

let contract = new web3.eth.Contract(abi, address);

const common = require('ethereumjs-common');


const chain = common.default.forCustomChain(
    'mainnet', {
    name: 'Mumbai',
    networkId: 80001,
    chainId: 80001
},
    'petersburg'
)

private1 = "7e8d602309e5c3e17437cd80d2ae642553094e491017f182192c387658dad108"//'f838914c2e5f66763be1f492c0ad5e6c4d3bb4f00ef1c355e0b826a998ff0c0c'//move this to env during deployment. variable classified 

// ///////////////////////////////////////////////////////////////Token Contract API///////////////////////////////////////////////////////////////
function submitTransaction(_rid, _cid, _md) {
    return new Promise(function (resolve, reject) {
        try {
            web3.eth.getBalance(account1).then(function (bal) {
                console.log(account1)
                var balance = web3.utils.fromWei(bal, 'gwei');
                console.log("A", balance);
                web3.eth.getBlock("latest", false, (error, result) => {
                    // var _gasLimit = result.gasLimit;
                    // console.log(_gasLimit);
                    let contract = new web3.eth.Contract(abi, address);
                    try {
                        // let amount1 = web3.utils.toWei(value.toString(), 'ether');
                        // var amount = web3.utils.toBN(amount1);
                        web3.eth.getGasPrice(function (error, result) {
                            //  969684170
                            var _gasPrice = 30000000000;
                            console.log("gp", _gasPrice); //gwei
                            console.log(account1);
                            var cost = web3.utils.fromWei(_gasPrice.toString(), 'gwei') * 390000;
                            console.log("B", cost);
                            if (balance >= cost) {
                                try {
                                    const privateKey = Buffer.from(private1, 'hex')
                                    // var _hex_gasLimit = web3.utils.toHex((_gasLimit).toString());
                                    var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                    // var _hex_value = web3.utils.toHex(amount.toString());
                                    var _hex_Gas = web3.utils.toHex('390000');
                                    console.log(_hex_Gas);
                                    console.log("ok 1")


                                    web3.eth.getTransactionCount(account1).then(
                                        nonce => {
                                            var _hex_nonce = web3.utils.toHex(nonce);
                                            console.log(_hex_nonce);
                                            console.log("ok 2")
                                            const txObject =
                                            {
                                                nonce: _hex_nonce,
                                                from: account1, //
                                                to: address, //
                                                gasPrice: _hex_gasPrice,
                                                //gasLimit: _hex_gasLimit,
                                                gas: _hex_Gas,
                                                value: '0x0',
                                                //var MetaURI = "https://infura-ipfs.io/ipfs/"+mdd.toString();
                                                data: contract.methods.addCertificate(_rid, _cid, "https://infura-ipfs.io/ipfs/" + _md.toString()).encodeABI()
                                            };
                                            console.log("ok 3")
                                            console.log("catch");
                                            const tx = new Tx(txObject, { common: chain, })
                                            tx.sign(privateKey);
                                            console.log("ok 4")
                                            var serializedTx = '0x' + tx.serialize().toString('hex');
                                            web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
                                                if (err) {
                                                    reject(err);
                                                    console.log("catch3");
                                                    // return false
                                                }
                                                else {
                                                    resolve(hash);
                                                    console.log("Transaction hash " + hash);
                                                    latest = hash;
                                                }
                                            })
                                        });
                                }

                                catch (error) {
                                    reject(error);
                                }

                            }
                            else console.log("Out of balance to cover the transaction cost")
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            })

        } catch (error) {
            reject(error);
        }
    })
}

function submitTransaction2(_rid, _cid) {
    return new Promise(function (resolve, reject) {
       // try {
            web3.eth.getBalance(account1).then(function (bal) {
                console.log(account1)
                var balance = web3.utils.fromWei(bal, 'gwei');
                console.log("A", balance);
                web3.eth.getBlock("latest", false, (error, result) => {
                    // var _gasLimit = result.gasLimit;
                    // console.log(_gasLimit);
                    let contract = new web3.eth.Contract(abi, address);
                    //try {
                        // let amount1 = web3.utils.toWei(value.toString(), 'ether');
                        // var amount = web3.utils.toBN(amount1);
                        web3.eth.getGasPrice(function (error, result) {
                            //  969684170
                            var _gasPrice = 30000000000;
                            console.log("gp", _gasPrice); //gwei
                            console.log(account1);
                            var cost = web3.utils.fromWei(_gasPrice.toString(), 'gwei') * 390000;
                            console.log("B", cost);
                            if (balance >= cost) {
                               // try {
                                    const privateKey = Buffer.from(private1, 'hex')
                                    // var _hex_gasLimit = web3.utils.toHex((_gasLimit).toString());
                                    var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                    // var _hex_value = web3.utils.toHex(amount.toString());
                                    var _hex_Gas = web3.utils.toHex('390000');
                                    console.log(_hex_Gas);
                                    console.log("ok 1")


                                    web3.eth.getTransactionCount(account1).then(
                                        nonce => {
                                            var _hex_nonce = web3.utils.toHex(nonce);
                                            console.log(_hex_nonce);
                                            console.log("ok 2")
                                            const txObject =
                                            {
                                                nonce: _hex_nonce,
                                                from: account1, //
                                                to: address, //
                                                gasPrice: _hex_gasPrice,
                                                //gasLimit: _hex_gasLimit,
                                                gas: _hex_Gas,
                                                value: '0x0',
                                                //var MetaURI = "https://infura-ipfs.io/ipfs/"+mdd.toString();
                                                data: contract.methods.revoke(_rid, _cid).encodeABI()
                                            };
                                            console.log("ok 3")
                                            console.log("catch");
                                            const tx = new Tx(txObject, { common: chain, })
                                            tx.sign(privateKey);
                                            console.log("ok 4")
                                            var serializedTx = '0x' + tx.serialize().toString('hex');
                                            web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
                                                if (err) {
                                                    reject(err);
                                                    console.log("catch3");
                                                    // return false
                                                }
                                                else {
                                                    resolve(hash);
                                                    console.log("Transaction hash " + hash);
                                                    latest = hash;
                                                }
                                            })
                                        }).catch (console.log("caught here 2"));
                                // }

                                // catch (error) {
                                //     reject(error);
                                // }

                            }
                            else console.log("Out of balance to cover the transaction cost")
                        }).catch (console.log("caught here 1"));
                    // }
                    // catch (error) {
                    //     reject(error);
                    // }
                });
            }).catch (console.log("caught here"));// {reject(error);}
    })
}



function submitTransaction3(_rid, _cid) {
    return new Promise(function (resolve, reject) {
        try {
            web3.eth.getBalance(account1).then(function (bal) {
                console.log(account1)
                var balance = web3.utils.fromWei(bal, 'gwei');
                console.log("A", balance);
                web3.eth.getBlock("latest", false, (error, result) => {
                    // var _gasLimit = result.gasLimit;
                    // console.log(_gasLimit);
                    let contract = new web3.eth.Contract(abi, address);
                    try {
                        // let amount1 = web3.utils.toWei(value.toString(), 'ether');
                        // var amount = web3.utils.toBN(amount1);
                        web3.eth.getGasPrice(function (error, result) {
                            //  969684170
                            var _gasPrice = 30000000000;
                            console.log("gp", _gasPrice); //gwei
                            console.log(account1);
                            var cost = web3.utils.fromWei(_gasPrice.toString(), 'gwei') * 390000;
                            console.log("B", cost);
                            if (balance >= cost) {
                                try {
                                    const privateKey = Buffer.from(private1, 'hex')
                                    // var _hex_gasLimit = web3.utils.toHex((_gasLimit).toString());
                                    var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                    // var _hex_value = web3.utils.toHex(amount.toString());
                                    var _hex_Gas = web3.utils.toHex('390000');
                                    console.log(_hex_Gas);
                                    console.log("ok 1")


                                    web3.eth.getTransactionCount(account1).then(
                                        nonce => {
                                            var _hex_nonce = web3.utils.toHex(nonce);
                                            console.log(_hex_nonce);
                                            console.log("ok 2")
                                            const txObject =
                                            {
                                                nonce: _hex_nonce,
                                                from: account1, //
                                                to: address, //
                                                gasPrice: _hex_gasPrice,
                                                //gasLimit: _hex_gasLimit,
                                                gas: _hex_Gas,
                                                value: '0x0',
                                                //var MetaURI = "https://infura-ipfs.io/ipfs/"+mdd.toString();
                                                data: contract.methods.ratify(_rid, _cid).encodeABI()
                                            };
                                            console.log("ok 3")
                                            console.log("catch");
                                            const tx = new Tx(txObject, { common: chain, })
                                            tx.sign(privateKey);
                                            console.log("ok 4")
                                            var serializedTx = '0x' + tx.serialize().toString('hex');
                                            web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
                                                if (err) {
                                                    reject(err);
                                                    console.log("catch3");
                                                    // return false
                                                }
                                                else {
                                                    resolve(hash);
                                                    console.log("Transaction hash " + hash);
                                                    latest = hash;
                                                }
                                            })
                                        });
                                }

                                catch (error) {
                                    console.log("caught")
                                   // reject(error);
                                }

                            }
                            else console.log("Out of balance to cover the transaction cost")
                        });
                    }
                    catch (error) {
                        console.log("caught122")//reject(error);
                    }
                });
            })

        } catch (error) {
            console.log("caught12")//reject(error);
        }
    })
}

///////////////////////////////////////////////////
function submitTransaction(_rid, _cid, _md) {
    return new Promise(function (resolve, reject) {
        try {
            web3.eth.getBalance(account1).then(function (bal) {
                console.log(account1)
                var balance = web3.utils.fromWei(bal, 'gwei');
                console.log("A", balance);
                web3.eth.getBlock("latest", false, (error, result) => {
                    // var _gasLimit = result.gasLimit;
                    // console.log(_gasLimit);
                    let contract = new web3.eth.Contract(abi, address);
                    try {
                        // let amount1 = web3.utils.toWei(value.toString(), 'ether');
                        // var amount = web3.utils.toBN(amount1);
                        web3.eth.getGasPrice(function (error, result) {
                            //  969684170
                            var _gasPrice = 30000000000;
                            console.log("gp", _gasPrice); //gwei
                            console.log(account1);
                            var cost = web3.utils.fromWei(_gasPrice.toString(), 'gwei') * 390000;
                            console.log("B", cost);
                            if (balance >= cost) {
                                try {
                                    const privateKey = Buffer.from(private1, 'hex')
                                    // var _hex_gasLimit = web3.utils.toHex((_gasLimit).toString());
                                    var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                    // var _hex_value = web3.utils.toHex(amount.toString());
                                    var _hex_Gas = web3.utils.toHex('390000');
                                    console.log(_hex_Gas);
                                    console.log("ok 1")


                                    web3.eth.getTransactionCount(account1).then(
                                        nonce => {
                                            var _hex_nonce = web3.utils.toHex(nonce);
                                            console.log(_hex_nonce);
                                            console.log("ok 2")
                                            const txObject =
                                            {
                                                nonce: _hex_nonce,
                                                from: account1, //
                                                to: address, //
                                                gasPrice: _hex_gasPrice,
                                                //gasLimit: _hex_gasLimit,
                                                gas: _hex_Gas,
                                                value: '0x0',
                                                //var MetaURI = "https://infura-ipfs.io/ipfs/"+mdd.toString();
                                                data: contract.methods.addCertificate(_rid, _cid, "https://infura-ipfs.io/ipfs/" + _md.toString()).encodeABI()
                                            };
                                            console.log("ok 3")
                                            console.log("catch");
                                            const tx = new Tx(txObject, { common: chain, })
                                            tx.sign(privateKey);
                                            console.log("ok 4")
                                            var serializedTx = '0x' + tx.serialize().toString('hex');
                                            web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
                                                if (err) {
                                                    reject(err);
                                                    console.log("catch3");
                                                    // return false
                                                }
                                                else {
                                                    resolve(hash);
                                                    console.log("Transaction hash " + hash);
                                                    latest = hash;
                                                }
                                            })
                                        });
                                }

                                catch (error) {
                                    reject(error);
                                }

                            }
                            else console.log("Out of balance to cover the transaction cost")
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            })

        } catch (error) {
            reject(error);
        }
    })
}
//////////////////////////////////////////////////////



app.use(cors())

app.post('/submit/:rid/:cid/:md', (req, res) => {
    let regN = req.params.rid;
    let Cid = req.params.cid;
    let Md = req.params.md;

    contract.methods.certs(Cid).call()
        .then(function (resp) {
            if (resp == 1) {
                res.send({ status: "404" });
            }
            else {
                submitTransaction(regN, Cid, Md).then(function () {
                    res.status(200).send({ status: 200 });
                })

            }
        })
})


app.post('/revoke/:rid/:cid', (req, res) => {
    let regN = req.params.rid;
    let Cid = req.params.cid;

    contract.methods.certs(Cid).call()
        .then(function (resp) {
            if (resp == 1) {
                submitTransaction2(regN, Cid).then(function () {
                    res.status(200).send({ status: 200 });
                })

              
            }
            else {
                res.send({ status: "404" });
            }
        })
})


// app.post('/ratify/:rid', (req, res) => {
//     let regN = req.params.rid;

//                 submitTransaction3(regN).then(function () {
//                     res.status(200).send({ status: 200 });
//                 })
// })


app.post('/ratify/:rid/:cid', (req, res) => {
    let regN = req.params.rid;
    let Cid = req.params.cid;

                submitTransaction3(regN, Cid).then(function () {
                    res.status(200).send({ status: 200 });
                })

})

app.get('/Ids/:rid', (req, res) => {
    var ids = {};
    contract.getPastEvents('Certificate', {
        filter: { rid: req.params.rid },
        fromBlock: 25636160,
        toBlock: 'latest'
    }, async function (error, events) {
        if (error == undefined) {
            for (i = 0; i < events.length; i++) {
                var s = await contract.methods.Details(events[i].returnValues.id).call()
                ids[i] = { id: events[i].returnValues.id, Mdata: events[i].returnValues.data, Status: s.revoked }
            }
        }
        else {
            console.log(error)
            res.status(404).send({ status: "404" });
        }
        res.status(200).send({ ids });
        //console.log(trxi)
    })
})

app.get("/status/:id",(req, res) => {
    let Cid = req.params.id;

    contract.methods.Details(Cid).call().then(function (resp) {
                var s = resp.revoked
                res.status(200).send({ a});

   })
})

app.get('/Id', (req, res) => {
    contract.methods.ids().call()
    .then(function (resp) {
        if (resp == undefined) {
            console.log(resp)
            res.send({ status: 404 });
        }
        else {
            console.log(resp)
            var temp = resp.toString()
            res.status(200).send({ temp });

        }
    })
    // var id ;
    // contract.getPastEvents('Certificate', {
    //     filter: { rid: req.params.rid },
    //     fromBlock: 25636160,
    //     toBlock: 'latest'
    // }, function (error, events) {
    //     if (error == undefined) {
    //          id = events[events.length - 1].returnValues.id
    //         // for (i = 0; i < events.length; i++) {
    //         //     ids[i] = { id: events[i].returnValues.id, Mdata: events[i].returnValues.data }
    //         // }
    //     }
    //     else {
    //         console.log(error)
    //         res.status(404).send({ status: "404" });
    //     }
    //     res.status(200).send({ id });
    //     //console.log(trxi)
    // })
})

app.get('/verify/:hash', (req, res) => {
    let Cid = req.params.hash;

    contract.methods.certs(Cid).call()
        .then(function (resp) {
            if (resp == 1) {
                res.send({ status: 404 });
            }
            else {
                res.status(200).send({ status: 200 });

            }
        })
})

// app.get('/latest', (req, res) => {
//     let ids = {};
//     contract.getPastEvents('Certificate', {
//         fromBlock: 25636160,
//         toBlock: 'latest'
//     }, async function (error, events) {
//         if (error == undefined) {
//             for (i = 0; i < events.length; i++) {
//               //  console.log(events[i])
//                 ids[i] = { id: events[i].returnValues.id, rid: events[i].returnValues.rid , Mdata: events[i].returnValues.data }
//             }
//         }
//         else {
//             console.log(error)
//             //res.status(404).send({ status: "404" });
//         }
//         //res.status(200).send({ ids });
//        // res.status(200).send({ ids });
//        var data = {}
//        let k = 0 ;
//        var idsl = Object.keys(ids).length; //6
//        var temp = idsl;

//        for (i = idsl - 3; i < idsl ; i++) { // 8 ,  , 10
        
//            await axios.get(ids[i].Mdata)
//            .then(function (response) {
//             if(i < idsl){
//             // console.log(i, ids[i].id)
//              data[k] = { id: ids[i].id, name:response.data.name , rid:response.data.rn, desc: response.data.description  }
//              k ++
//             }
//           })
        
        
//           // ids[i] = { id: events[i].returnValues.id, Mdata: events[i].returnValues.data }
//        }
//        console.log(data)
//        res.status(200).send({ data });
//     })

   
    

// })



app.listen(3004, () => console.log('API for IMDS running on 3004'))