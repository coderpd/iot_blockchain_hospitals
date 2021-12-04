'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const Asset = require('./asset.js');

class AssetList extends StateList {

    constructor(ctx) {
        super(ctx, 'asset');
        this.use(Asset)
    }

    async addAsset(asset){
        return this.addState(asset);
    }

    async getAsset(assetId){
        return this.getState(assetId);
    }

    async updateAsset(asset){
        return this.updateState(asset);
    }


}

module.exports = AssetList;