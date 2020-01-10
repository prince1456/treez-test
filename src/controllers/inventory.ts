import {Request, Response} from "express";
import Inventories from '../schema/inventorySchema'
/**
 * Loads all inventories Controllers.
 */
export async function getItems(request: Request, response: Response) {
    Inventories.getProducts(request, response)
   
}
export async function createItem(request: Request, response: Response) {
    Inventories.addNewProduct(request, response)
}

export async function getItem(request: Request, response: Response) {

    Inventories.getProductWithID(request, response)
}

export async function updateItem(request: Request, response: Response) {

    Inventories.updateProduct(request, response)
}
export async function deleteItem(request: Request, response: Response) {
    Inventories.deleteProductWithId(request, response)
}
