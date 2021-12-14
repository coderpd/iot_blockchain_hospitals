

const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const Asset = require('../contract/lib/asset.js');


const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/login', async (req, res) => {
    try{

        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pe
        m;
        // const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../devices/application/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(req.body.username);
        if (identity) {
            // console.log('An identity for the admin user "admin" already exists in the wallet');
            // return;
            res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${req.body.username}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
        }
        else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
        }

    } catch (err){
        console.log(err);
        res.send("Internal server error");
    }
});


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});