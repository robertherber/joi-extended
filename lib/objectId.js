'use strict';

// Load modules

const Any = require('./any');
const ObjectID = require('mongorito').ObjectID;

// Declare internals

const internals = {};

internals.ObjectID = class extends Any {

    constructor(){

        super();
        this._type = 'objectId';
        this._inner.children = null;
        this._inner.renames = [];
        this._inner.dependencies = [];
        this._inner.patterns = [];

    }

    _base(value, state, options){

        const result = {
            value
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

        result.errors = isObjectId ? null : this.createError('objectId.base', null, state, options);
        return result;
    }
};

module.exports = new internals.ObjectID();
