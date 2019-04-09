import { Request, Response, NextFunction } from 'express';
export declare class Listing {
    _model: any;
    constructor(norm: any);
    deleteListing(model: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateListing(model: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createListing(model: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllListings(model: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getListingById(model: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    model: any;
}
