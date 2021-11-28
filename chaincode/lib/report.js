'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');
var uuid = require('uuid');

class Report extends State {
    constructor(ctx) {
        super(ctx, 'report');
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
    setDoctorID(doctorID) {
        this.doctorID = doctorID;
    }

    getDoctorID() {
        return this.doctorID;
    }
    static deserialize(data) {
        return State.deserializeClass(data, Report);
    }

    static fromBuffer(buffer) {
        return Report.deserialize(buffer);
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
    static createInstance(patientID, doctorID, file) {
        let state = new Report();
        state.setPatientID(patientID);
        state.setDoctorID(doctorID);
        state.file = file;
        state.assetId = uuid.v4();
        return state;
    }
}