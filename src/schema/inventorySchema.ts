import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

const Schema = mongoose.Schema;

export interface IProduct extends Document {
    name: string;
    description: string;
    quantity: number;
    total_price: number;
    price: number;
    created_date: Date;
  }

export const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
   
    quantity: {
        type: Number            
    },
    price: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const productModal = mongoose.model<IProduct>('Inventory', productSchema);

class Inventories {

    public addNewProduct(req: Request, res: Response ) { 
        let newInventory = new productModal(req.body);
    
        newInventory.save((err, product) => {
            if(err){
                res.send(err);
            }    
            res.json(product);
        });
    }

    public getProducts (req: Request, res: Response) {           
        productModal.find({}, (err, product) => {
            if(err){
                res.send(err);
            }
            res.json(product);
        });
    }

    public getProductWithID (req: Request, res: Response) {    
        productModal.findById(req.params.productId, (err, product) => {
            if(err){
                res.send(err);
            }
            res.json(product);
        });
    }

    public updateProduct (req: Request, res: Response) {           
        productModal.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
            if(err){
                res.send(err);
            }
            res.json(product);
        });
    }

    public deleteProductWithId (req: Request, res: Response) {           
        productModal.remove({ _id: req.params.productId }, (err, product) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted order!'});
        });
    }
    
}
export default new Inventories;