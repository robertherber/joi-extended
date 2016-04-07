'use strict';

// Load modules

const Any = require('./any');
const Errors = require('./errors');
const Hoek = require('hoek');
const ObjectID = require('bson').BSONPure.ObjectID;

// Declare internals

const internals = {};

internals.ObjectID = function () {

    Any.call(this);
    this._type = 'objectId';
};

Hoek.inherits(internals.ObjectID, Any);


internals.ObjectID.prototype._base = function (value, state, options) {

    const result = {
        value: value
    };

    if (typeof value === 'string' &&
        options.convert) {

        try {
            result.value = new ObjectID(value);
        }
        catch (err) { }
    }

    const isObjectId = result.value &&
                     typeof result.value === 'object' &&
                     ObjectID.isValid(result.value.id);

    result.errors = isObjectId ? null : Errors.create('objectId.base', null, state, options);
    return result;
};


module.exports = new internals.ObjectID();
