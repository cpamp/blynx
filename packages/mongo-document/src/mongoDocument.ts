import * as mongodb from 'mongodb';
import { IMongoDocument } from './mongoDocument.interface';
let uuid: () => string = require('uuid/v4');

/**
 * Base document
 * 
 * @export
 * @abstract
 * @class MongoDocument
 */
export abstract class MongoDocument {
    /**
     * Db Collection for document
     * 
     * @private
     * @type {mongodb.Collection}
     * @memberof MongoDocument
     */
    private collection: mongodb.Collection;

    /**
     * Unique identifier for document
     * 
     * @type {string}
     * @memberof MongoDocument
     */
    public _id: string;

    /**
     * Creates an instance of MongoDocument.
     * @param {mongodb.Collection} collection Collection where mongo document persists
     * @memberof MongoDocument
     */
    constructor(collection: mongodb.Collection) {
        this.collection = collection;
    }

    /**
     * Serialize the document to be saved in the database. The return of this function is saved to the collection.
     * Note: Typescript has circular dependencies with _this, return an object literal.
     * 
     * @protected
     * @abstract
     * @returns {IMongoDocument} 
     * @memberof MongoDocument
     */
    protected abstract serialize(): IMongoDocument;

    /**
     * Upsert the current document. Generates an _id with UUID if _id is null.
     * 
     * @returns 
     * @memberof MongoDocument
     */
    upsert() {
        if (this._id == null) {
            this._id = uuid();
        }
        return this.collection.update({ _id: this._id }, { $set: this.serialize() }, { upsert: true });
    }

    /**
     * Gets a document based on _id and populates itself with the result.
     * 
     * @param {string} id _id to match
     * @returns {Promise<this>} 
     * @memberof MongoDocument
     */
    get(id: string): Promise<this> {
        return this.collection.findOne({_id: id}).then((item) => {
            for (let prop in item) {
                if (item.hasOwnProperty(prop)) {
                    (<any>this)[prop] = item[prop];
                }
            }
            return this;
        });
    }

    /**
     * Delete the document from the database
     * 
     * @returns {Promise<mongodb.WriteOpResult>} 
     * @memberof MongoDocument
     */
    delete(): Promise<mongodb.WriteOpResult> {
        return this.collection.remove({ _id: this._id });
    }

    /**
     * Refreshes the current object properties to what persists in the database
     * 
     * @returns {Promise<this>} 
     * @memberof MongoDocument
     */
    refresh(): Promise<this> {
        return this.get(this._id);
    }
}