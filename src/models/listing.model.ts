import { Request, Response, NextFunction } from 'express'
export class Listing {
    _model: any;
    constructor(norm: any) {
        this.model = [{
            id: { type: Number, key: 'primary' },
            Status: { type: String, maxlength: 24 },
            Name: { type: String, maxlength: 24 },
            Area: { type: String, maxlength: 24 },
            Category: { type: String, maxlength: 24 },
            Date: { type: String, maxlength: 24 },
            image_url: { type: String, maxlength: 1000},

         
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
    deleteListing(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = await carCtrl.remove(req, null, null);
            console.log('resp from delete', resp);
            res.json({ message: 'Success', resp });
        }
    }
    updateListing(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = await carCtrl.update(req, null, null);
            console.log('resp from update', resp);
            res.json({ message: 'Success', resp });
        }
    }
    createListing(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log('req.body===>', req.body);
            let carCtrl = model.controller;
            let resp = await carCtrl.insert(req, null, null);
            res.json({ message: 'Success', resp });
        }
    }
    getAllListings(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            req.body = {
                get: ['*']
            }
            let carCtrl = model.controller;
            let resp = await carCtrl.get(req, null, null);
            res.json({ message: 'Success', resp });
        }
    }

    getListingById(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            }
            let carCtrl = model.controller;
            let resp = await carCtrl.get(req, null, null);
            res.json({ message: 'Success', resp });
        }
    }

    set model(model: any) {
        this._model = model;
    }

    get model() {
        return this._model;
    }

}