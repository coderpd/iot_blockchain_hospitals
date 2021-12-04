'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');
var uuid = require('uuid');


const assetState = {
    CREATED: 1,
    APPROVED: 2,
    REJECTED: 3,
    REDO: 4,
};

class Asset extends State {
    constructor(obj) {
        super(Asset.getClass(), [obj.assetId, obj.assetName, obj.assetType, obj.assetState, obj.patientID, obj.doctorID]);

    }

    setOwnerMSP(mspid) {
        this.mspid = mspid;
    }

    getOwnerMSP() {
        return this.mspid;
    }

    getID() {
        return this.assetId;
    }

    getPatientID() {
        return this.patientID;
    }
    setPatientID(id) {
        this.patientID = id;
    }
    getAssetName() {
        return this.assetName;
    }
    setAssetName(name) {
        this.assetName = name;
    }
    getAssetType() {
        return this.assetType;
    }
    setAssetType(type) {
        this.assetType = type;
    }
    getAssetState() {
        return this.assetState;
    }
    setAssetState(state) {
        this.assetState = state;
    }

    setDoctorID(doctorID) {
        this.doctorID = doctorID;
    }

    getDoctorID() {
        return this.doctorID;
    }

    static deserialize(data) {
        return State.deserializeClass(data, Asset);
    }

    static fromBuffer(buffer) {
        return Asset.deserialize(buffer);
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static createInstance(assetName, assetType, patientID) {
        return new Asset({
            assetId: uuid.v4(),
            assetName: assetName,
            assetType: assetType,
            assetState: assetState.CREATED,
            patientID: patientID
        });
    }
    // static getClass() {
    //     return Asset;
    // }

    isApproved() {
        return this.assetState === assetState.APPROVED;
    }
    isCreated() {
        return this.assetState === assetState.CREATED;
    }
    isRejected() {
        return this.assetState === assetState.REJECTED;
    }
    isRedo() {
        return this.assetState === assetState.REDO;
    }
    static getClass() {
        return 'org.hospitalnet.asset';
    }
}

module.exports = Asset;