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
class Listing {
    constructor(norm) {
        this.model = [{
                id: { type: Number, key: 'primary' },
                Status: { type: String, maxlength: 24 },
                Name: { type: String, maxlength: 24 },
                Area: { type: String, maxlength: 24 },
                Category: { type: String, maxlength: 24 },
                Date: { type: String, maxlength: 24 },
                image_url: { type: String, maxlength: 1000 },
            }, 'A table to store listing info',
            [
                {
                    route: '/get-all-listings',
                    method: 'POST',
                    callback: this.getAllListings,
                    requireToken: true,
                },
                {
                    route: '/get-listing-by-id/:id',
                    method: 'POST',
                    callback: this.getListingById,
                    requireToken: true,
                },
                {
                    route: '/create-listing',
                    method: 'POST',
                    callback: this.createListing,
                    requireToken: true,
                },
                {
                    route: '/update-listing/id/:id',
                    method: 'PUT',
                    callback: this.updateListing,
                    requireToken: true,
                },
                {
                    route: '/delete/id/:id',
                    method: 'DELETE',
                    callback: this.deleteListing,
                    requireToken: true,
                }
            ]];
    }
    deleteListing(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.remove(req, null, null);
            console.log('resp from delete', resp);
            res.json({ message: 'Success', resp });
        });
    }
    updateListing(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.update(req, null, null);
            console.log('resp from update', resp);
            res.json({ message: 'Success', resp });
        });
    }
    createListing(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = yield carCtrl.insert(req, null, null);
            res.json({ message: 'Success', resp });
        });
    }
    getAllListings(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let carCtrl = model.controller;
            let resp = yield carCtrl.get(req, null, null);
            res.json({ message: 'Success', resp });
        });
    }
    getListingById(model) {
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
exports.Listing = Listing;
