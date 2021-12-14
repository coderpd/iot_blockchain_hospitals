'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const Asset = require('../../contract/lib/asset.js');


// Main program function
async function main () {

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('wallet');


    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'appUser';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org1.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: true, asLocalhost: true }

        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use org.hospitalnet.asset smart contract.');

        const contract = await network.getContract('iothospital');

        // buy commercial paper
        // console.log(contract)
        console.log('Submit create asset transaction.');

        const createResponse = await contract.submitTransaction('createAsset', '1', 'P001', 1, 'Patient Report', 'D001');

        // process response
        console.log('Process buy transaction response.');

        let paper = Asset.fromBuffer(createResponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully purchased by ${paper.owner}`);
        console.log('Transaction complete.');

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Buy program complete.');

}).catch((e) => {

    console.log('Buy program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});