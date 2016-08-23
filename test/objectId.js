'use strict';
// Load modules

const Lab = require('lab');
const Code = require('code');
const Joi = require('../lib');
const Helper = require('./helper');
const ObjectID = require('mongorito').ObjectID;


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('objectId', () => {

    it('converts a hex string to an objectId', (done) => {

        const hexString = '507f1f77bcf86cd799439011';
        Joi.objectId().validate(hexString, (err, value) => {

            expect(err).to.not.exist();
            expect(value.toHexString()).to.equal(hexString);
            done();
        });
    });

    it('errors on non-hex string', (done) => {

        const invalidString = 'a string';
        Joi.objectId().validate(invalidString, (err, value) => {

            expect(err).to.exist();
            expect(value).to.equal(invalidString);
            done();
        });
    });

    it('validates a null', (done) => {

        const schema = Joi.objectId().required();
        Helper.validate(schema, [
            [null, false, null, '"value" must be an objectId']
        ], done);
    });

    it('validates an objectId', (done) => {

        const schema = Joi.objectId().required();
        Helper.validate(schema, [
            [new ObjectID('507f1f77bcf86cd799439011'), true]
        ], done);
    });

    it('validates a string', (done) => {

        const schema = Joi.objectId().required();
        Helper.validate(schema, [
            ['abc', false, null, '"value" must be an objectId']
        ], done);
    });
});
