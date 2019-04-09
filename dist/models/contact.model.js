"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Contact {
    constructor(norm) {
        this.model = [{
                id: { type: Number, key: 'primary' },
                FirstName: { type: String, maxlength: 24 },
                LastName: { type: String, maxlength: 24 },
                Rating: { type: String, maxlength: 24 },
                image_url: { type: String, maxlength: 1000 },
                // image_url: { type: String, maxlength: 1000},
                listing_id: {
                    type: Number,
                    key: 'foreign',
                    references: { table: 'Listing', foreignKey: 'id' },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
            }, 'A table to store contact info',
            [
                {
                    route: '/get-all-contacts',
                    method: 'POST',
                    callback: this.getAllContacts,
                    requireToken: true,
                },
                {
                    route: '/get-contact-by-id/:id',
                    method: 'POST',
                    callback: this.getContactById,
                    requireToken: true,
                },
                {
                    route: '/create-contact',
                    method: 'POST',
                    callback: this.createContact,
                    requireToken: true,
                },
                {
                    route: '/update-contact/id/:id',
                    method: 'PUT',
                    callback: this.updateContact,
                    requireToken: true,
                },
                {
                    route: '/delete/id/:id',
                    method: 'DELETE',
                    callback: this.deleteContact,
                    requireToken: true,
                }
            ]];
    }
    deleteContact(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.remove(req, null, null);
            console.log('resp from delete', resp);
            res.json({ message: 'Success', resp });
        });
    }
    updateContact(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.update(req, null, null);
            console.log('resp from update', resp);
            res.json({ message: 'Success', resp });
        });
    }
    createContact(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.insert(req, null, null);
            res.json({ message: 'Success', resp });
        });
    }
    getAllContacts(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let carCtrl = model.controller;
            let resp = yield carCtrl.get(req, null, null);
            res.json({ message: 'Success', resp });
        });
    }
    getContactById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let carCtrl = model.controller;
            let resp = yield carCtrl.get(req, null, null);
            res.json({ message: 'Success', resp });
        });
    }
    set model(model) {
        this._model = model;
    }
    get model() {
        return this._model;
    }
}
exports.Contact = Contact;
