import { Request, Response, NextFunction } from 'express'
export class Contact {
  _model: any;
  constructor(norm: any) {
    this.model = [{
      id: { type: Number, key: 'primary' },
      FirstName: { type: String, maxlength: 24 },
      LastName: { type: String, maxlength: 24 },
      Rating: { type: String, maxlength: 24 },
      image_url: { type: String, maxlength: 1000},
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
  deleteContact(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body===>', req.body);
      let carCtrl = model.controller;
      let resp = await carCtrl.remove(req, null, null);
      console.log('resp from delete', resp);
      res.json({ message: 'Success', resp });
    }
  }
  updateContact(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body===>', req.body);
      let carCtrl = model.controller;
      let resp = await carCtrl.update(req, null, null);
      console.log('resp from update', resp);
      res.json({ message: 'Success', resp });
    }
  }
  createContact(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body===>', req.body);
      let carCtrl = model.controller;
      let resp = await carCtrl.insert(req, null, null);
      res.json({ message: 'Success', resp });
    }
  }
  getAllContacts(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*']
      }
      let carCtrl = model.controller;
      let resp = await carCtrl.get(req, null, null);
      res.json({ message: 'Success', resp });
    }
  }

  getContactById(model: any) {
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