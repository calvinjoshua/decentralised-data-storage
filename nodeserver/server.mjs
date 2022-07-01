 import express from 'express';

 import cors from 'cors';

import {Transaction} from 'ethereumjs-tx'


import web from 'web3';
// import { checkPrime } from 'crypto';
// import { urlToHttpOptions } from 'url'; https://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3000/transactionHistory/0x847ffb59a728ba5e3d530e4c2b843fa3c4403cfd

const web3 = new web('https://ropsten.infura.io/v3/0186bbd47475436b9e3ff3d644b4d21c');

const app = express();

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"metadata","type":"string"}],"name":"EditData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"rn","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"hash","type":"string"},{"internalType":"string","name":"metadata","type":"string"}],"name":"addItem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rn","type":"uint256"},{"internalType":"uint256","name":"d","type":"uint256"}],"name":"getId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rn","type":"uint256"}],"name":"getIdLenght","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenId","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenIdt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const address = '0x3bF2073fEf20BF6B65C965DBb5E75c81B6D9c707'; //0x3bF2073fEf20BF6B65C965DBb5E75c81B6D9c707

let contract = new web3.eth.Contract(abi, address);

const account1 = '0xb44Fb70aEF96C5aa1E463Aab9eFF5f596b13B013'

var private1 = 'fbb69ffabcad0e0a66ce6af6b199c3c9dd358223ec21eedd5c3b9ce66e61a9bf'; //save this in env variable

var latestHash;

// var statusA;

async function main(registration_no,address,file,mdd) {
    return new Promise(function (resolve, reject) {
        try {
          var contractAddress = "0x3bF2073fEf20BF6B65C965DBb5E75c81B6D9c707";
            web3.eth.getBalance(account1).then(function (bal) {
                console.log(account1)
                var balance = web3.utils.fromWei(bal, 'gwei');
                console.log(balance);
                web3.eth.getBlock("latest", false, (error, result) => {
                    var _gasLimit = result.gasLimit;
                    console.log(_gasLimit);
                    //gas limit
                    let contract = new web3.eth.Contract(abi, contractAddress);
                    // metad.name =data;
                    // metad.description = description;
                   // var URI = "http://8a53-2405-201-e036-d803-1a86-27d4-1f06-b490.ngrok.io"+file.toString();//not required
                    var MetaURI = "https://infura-ipfs.io/ipfs/"+mdd.toString(); //MASTER CHECK  //add /ipfs/
                        try {
                            web3.eth.getGasPrice(function (error, result) {
                                var _gasPrice = result;
                                console.log(_gasPrice);
                             

                                    console.log(account1);
                                    try {
                                        const privateKey = Buffer.from(private1, 'hex')
                                        var _hex_gasLimit = web3.utils.toHex((_gasLimit + 1000000).toString());
                                        var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                        var _hex_Gas = web3.utils.toHex('390000');
                                        console.log(_hex_Gas);

                                        web3.eth.getTransactionCount(account1).then(
                                            nonce => {
                                                var _hex_nonce = web3.utils.toHex(nonce);
                                                console.log(_hex_nonce);

                                                const rawTx =
                                                {
                                                    nonce: _hex_nonce,
                                                    from: account1, //
                                                    to: contractAddress, //
                                                    gasPrice: _hex_gasPrice,
                                                    gasLimit: _hex_gasLimit,
                                                    gas: _hex_Gas,
                                                    value: '0x0',
                                                    data: contract.methods.addItem(registration_no,address, file, MetaURI).encodeABI()
                                                };
                                                console.log("catch");
                                                var tx = new Transaction(rawTx, { chain: 'ropsten' });
                                                tx.sign(privateKey);
                                                //console.log(process.env.private1);
                                                var serializedTx = '0x' + tx.serialize().toString('hex');
                                                web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
                                                    if (err) {
                                                        reject(err);
                                                        console.log("catch3");
                                                    }
                                                    else {
                                                        resolve(hash);
                                                        console.log("Transaction hash " + hash);
                                                        latestHash = hash;
                                                    }
                                                })
                                            });
                                    } catch (error) {
                                        reject(error);
                                    }
                              
                            });
                        } catch (error) {
                            reject(error);
                        }
                    //});
                });
            })
        } catch (error) {
            reject(error);
        }
    })
  
}

// function check(hash){
//     web3.eth.getTransactionReceipt(hash, function (error, result){
//         //console.log(result.status);
//         statusA = result.status;

//     });

// }
// function check(){
// contract.getPastEvents('Transfer', {
//     filter: { to: req.params.address },
//     fromBlock: 0,
//     toBlock: 'latest'
// }, function (error, events) {
//     for (i = 0; i < events.length; i++) {
//         trxi[a] = { Hash: events[i].rtransactionHash, from: events[i].returnValues.from, to: events[i].returnValues.to, value: events[i].returnValues.value }
//         a++;
//     }
//     //console.log(trxi)

// }) }


//mint(address)
//}

// var corsOptions = {
//     origin: 'https://127.0.0.1:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
   

//, function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
   

//mint
  /////////////////////////////

//main('ade3333','calvin','calvin test','a.jpg')


// var i = 1;

// for array
// var filesUrl = []
  
// function s1(url){
//     //  var size = filesUrl.length;

//     // for(var i =0; i < size; i++){
//     //     if(filesUrl[i] === url){

//     //         return false;
//     //         // res.send({status:"fail"});

//     //     }

//     // }

//     // return true;

// }

app.use(cors())
 
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 ,cors(corsOptions)
//   }

var file = {};
function s1(url){

    if(file[url] !== undefined){
        return false;
    }
    else{
      
        return true;
    }
    //  var size = filesUrl.length;

    // for(var i =0; i < size; i++){
    //     if(filesUrl[i] === url){

    //         return false;
    //         // res.send({status:"fail"});

    //     }

    // }

    // return true;

}
  app.post('/additem/:registration_no/:address/:file/:md', async (req, res) => {
    let add = req.params.address;
     let d = req.params.registration_no; //name
    // let des = req.params.description;//description
    let f = req.params.file; //URI
   
     var temp = s1(f)

    // var temp;
    // var size = filesUrl.length;

    // for(var i =0; i < size; i++){
    //     if(filesUrl[i] === f){
    //         res.send({status:"fail"});

    //     }
    // }
    
    
    // let fu = String(f);
// console.log(f)
    // if(filesUrl.i !== 1){
    //     filesUrl.f = 1;
    if(temp == true){
      //  filesUrl.push(f) 
    await main(req.params.registration_no,add,f,req.params.md);
    file[f] = d;
    res.status(200).send({status:"200"});
    }
    else{
       res.send({status:"fail"});
    }
    // console.log(filesUrl)
    // filesUrl.push(f)
//  }
//     else{//for time being, before calling the file should be present in the server
       
        
//         res.send({status:"fail"});
//         console.log(filesUrl)
//     }    
        // check(cHash);
    //console.log(statusA)
   // console.log()
   //console.log(latestHash)
    
  
})


// function step1() {

// }

app.get('/check/:registration_no',async (req, res) => {
    var length;
    var ids = {};
    var idsa = [];
    var links = {};
    var b = 0;
   var b1 = 0;
    let rn = req.params.registration_no

    await contract.methods.getIdLenght(rn).call()
    .then(function (_length) {

  length = _length;


    })
    for(var i=0;i < length;i++){
        await contract.methods.getId(rn,i).call()
    .then(function (a) {
    ids[b] = a;
    idsa.push(a)
    b ++;
    })
    }

    var size =  Object.keys(ids).length;//idsa.length;

    for(var i=0; i < size; i ++){
        await contract.methods.tokenId(ids[i]).call()
    .then(function(c) {
    links[b1] = c;
    b1 ++;
    })
    }
   // var sl = int(size)
//     for(var j=0;j < size;j++){
//         contract.methods.tokenId(idsa[i]).call()
//     .then(function (c) {
//     links[b1] = c;
//     b1 ++;
//     })
//    }

    console.log(links)
    
    res.status(200).send({ids:ids, urls:links});
    console.log(file)
  
})

app.get('/status', (req, res) => res.send({status:200}));

// app.get('/status',async (req, res) => {
  
//     var temp = latestHash;
//     var t = check(temp);
    
//     if(t === true){

//         res.status(200).send({status: true})
//     }

//     else{
//         res.send({status: false})
//     }

  
  
// })


app.get('/verify/:hash', async (req, res) => {

     console.log(req.params.hash)
      var t = req.params.hash;
    var temp = s1(t)
     //res.status(200).send({is: true});
     if(temp){
         res.send({status: false})
         //console.log(file[t], t)

        }
     else{
         res.send({status: true})
        }
    // filesUrl.push(f)
  })


app.listen(8000, () => console.log('API for nft project running on 3000'))

// const endpoint = 'https://api.nft.storage' // the default
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZCMDIwNjMyZDM2REEwODZkMTU0N0YyNjJmZDJGNUNDMmVENEE4QjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzQzMTQxNTk4NiwibmFtZSI6InRlc3QxIn0.Hz75raTh1pQxnRAWNBDB_Jk0P9vE7Hi6l4ebV-IyBQM' // your API key from https://nft.storage/manage

  
// main('calvin', 'clvin test', 'a.jpg')    //9787773486

/**
 a smart contract, where each nft will have an uidque id

 when a certificate(nft) is minted to an users address

 the user will get the nft id(According to the smart contract the owner of this  id is that owner and no one can change itvother than org)

 when he enters the id in the portal, it will return the nft associated with that id //only if logins with his address

 this gaurentees that the nft is minted by the legit smart contract dedicated to certain university or goverment

 the application will return only the id available in the smart contract, so this stop anyone from getting a fake certificate,
 since only org or goverment can include in the smart contract

 ////////////

 Advantage high redundancy of certificate

 eliminated fake certificates

 create a digital immutable certificate for the students   ////////////////////////////////////////////////////////// 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

 ///////////////////
 REQUIREMENTS

 An server to store teh certificates and run ipfs deamon

 An server to query the smart contract and serve the application

 //With IPFS technology it can be accessed from anywhere with high availablity of data


 */