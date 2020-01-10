import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { productModal } from './inventorySchema';

const Schema = mongoose.Schema;

interface ICart {
    productId: string,
    quantity: number,
}

export interface IOrder extends Document {
    customer_email: string;
    carts: ICart[];
    total_price: number;
    date_order: Date;
    order_status: string;
}
export const orderSchema = new Schema({
    customer_email: {
        type: String,
    },
    carts: {
        type: Array,
    },
    total_price: {
        type: Number
    },
    date_order: {
        type: Date,
        default: Date.now
    },
    order_status: {
        type: String
    },

});
const orderModal = mongoose.model<IOrder>('Order', orderSchema);
/**
 * Class representing a Orders.
 */
class Order {
    /**
        * create a new order
        * @param {Array} carts - the products the customer bought.
        * @param {string} order_status - this prams shows the status of order.
        * @param {string} customer_email - the email of user .
        * @param {number} width - The width of the dot, in pixels.
        * 
        * @return {object} the new order.
        */
    public async addNewOrder(req: Request, res: Response) {
        const { carts } = req.body;
        let total_price = 0
        const productPromises = carts.map(async item => {
            const product = await productModal.findById(item.productId)
            await productModal.findOneAndUpdate({ _id: item.productId }, { quantity: product.quantity - item.quantity }, { new: true })
            total_price = + product.price * item.quantity
            return
        })
        await Promise.all(productPromises)
        const orderParams = { ...req.body, total_price }
        let newOrder = new orderModal(orderParams);

        newOrder.save((err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public getOrders(req: Request, res: Response) {
        orderModal.find({}, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public getOrderWithID(req: Request, res: Response) {
        orderModal.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public updateOrder(req: Request, res: Response) {
        orderModal.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public deleteOrderWithId(req: Request, res: Response) {
        orderModal.remove({ _id: req.params.orderId }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted order!' });
        });
    }

}
export default new Order;