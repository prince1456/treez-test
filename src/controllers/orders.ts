import {Request, Response} from "express";
import Order from '../schema/orderSchema'
/**
 * Loads all orders from the database.
 */
export async function getOrders(request: Request, response: Response) {

    Order.getOrders(request, response)
}
export async function createOrder(request: Request, response: Response) {
    Order.addNewOrder(request, response)
}

export async function getOrder(request: Request, response: Response) {
    Order.getOrderWithID(request, response)
}

export async function updateOrder(request: Request, response: Response) {

    Order.updateOrder(request, response)
}
export async function deleteOrder(request: Request, response: Response) {

 Order.deleteOrderWithId(request, response)
}
