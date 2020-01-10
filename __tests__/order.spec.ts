// new request()
import Order, { ICart, IOrder } from '../src/schema/orderSchema'
import { IProduct } from '../src/schema/inventorySchema'

import { post, getRequest, deleteRequest, putRequest } from '../util/util'
import Faker from 'faker'
const carts = []

describe('Inventory Apis', () => {
    beforeAll(async () => {
        let times = 0
        while (times < 7) {
            times++
            const product = <IProduct>{
                name: `laptop ${times}`,
                price: 150,
                quantity: 300,
                description: 'this item is so cool',
            }
            const response = await post(`/inventories`, product)
            carts.push({productId: response.body._id, quantity: times + 1})
        }
    })
    it('should get list of orders', async () => {
        const response = await getRequest(`/orders`)
          .expect(200);
        expect(response.body.length).toBeGreaterThan(2);
      })
    it('should add a order', async () => {
        const productObject = <IOrder>{
            customer_email: "ImHere@yahoo.com",
            carts,
            order_status: "Shipped",
        }
        const response = await post(`/orders`, productObject)
            .expect(200);
            console.log(response.body)
        expect(response.body.customer_email).toBe(productObject.customer_email);
    })
   
})