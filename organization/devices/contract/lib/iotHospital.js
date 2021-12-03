'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const {
    Contract
} = require('fabric-contract-api');
const Asset = require('./asset.js');
const AssetList = require('./assetList.js');

class IoTHospitalContext extends Context {
    constructor() {
        super();
        this.assetList = new AssetList(this);
    }
}

class IoTHospitalContract extends Contract {

    constructor() {
        super('org.hospitalnet.asset');
    }

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const patients = [{
            patientId: '1',
            patientName: 'Ram',
            patientAge: '20',
            patientGender: 'M',
            files: [],
        },{
            patientId: '2',
            patientName: 'Neeraj',
            patientAge: '25',
            patientGender: 'M',
            files: [],
        }, {
            patientId: '2',
            patientName: 'Sheetal',
            patientAge: '25',
            patientGender: 'F',
            files: [],
        }, ];
    }
    
    createContext() {
        return new IoTHospitalContext();
    }

    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    async createAsset(ctx, patientId, assetType, assetName, doctorID) {
        console.info('============= START : Create Asset ===========');

        let asset = new Asset.createInstance(assetName, assetType, patientId);

        let mspid = ctx.clientIdentity.getMSPID();
        asset.setOwnerMSP(mspid);
        
        asset.setDoctorID(doctorID);

        await ctx.assetList.addAsset(asset);


        console.info('============= END : Create Asset ===========');

        return asset;    

    }

    async approveAsset(ctx, assetId, doctorID) {
        console.info('============= START : Approve Asset ===========');

        let asset = Asset.makeKey([assetId]);

        if (!ctx.assetList.exists(asset)) {
            throw new Error('Asset does not exist');
        }
        if (asset.doctorID !== doctorID) {
            throw new Error('This doctor cannot approve this asset');
        }
        if (asset.isApproved()) {
            throw new Error('Asset is already approved');
        }

        if (asset.isRejected()) {
            throw new Error('Asset is rejected');
        }

        
        if (asset.isCreated()) {
            asset.setState(assetState.APPROVED);
        }

        await ctx.assetList.updateAsset(asset);

        return asset;

        console.info('============= END : Approve Asset ===========');
    }

    async rejectAsset(ctx, assetId, doctorID) {
        console.info('============= START : Reject Asset ===========');

        let asset = Asset.makeKey([assetId]);

        if (!ctx.assetList.exists(asset)) {
            throw new Error('Asset does not exist');
        }
        if (asset.doctorID !== doctorID) {
            throw new Error('This doctor cannot approve this asset');
        }

        if (asset.isRejected()) {
            throw new Error('Asset is already rejected');
        }

        
        if (asset.isCreated()) {
            asset.setState(assetState.REJECTED);
        }

        await ctx.assetList.updateAsset(asset);

        return asset;

        console.info('============= END : Reject Asset ===========');
    }

}

module.exports = IoTHospitalContract;