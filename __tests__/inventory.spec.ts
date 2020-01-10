// new request()
import Inventories, { IProduct } from '../src/schema/inventorySchema'
import { post, getRequest, deleteRequest, putRequest } from '../util/util'
const productObject = <IProduct>{
  name: "blue mug",
  price: 150,
  quantity: 300,
  description: 'this item is so cool',
}
describe('Inventory Apis', () => {
  beforeAll(async () => {
    let times = 0
    
    while(times < 7) {
      times ++
      const product = <IProduct>{
        name: `Hey ${times}`,
        price: 150,
        quantity: 300,
        description: 'this item is so cool',
      }
      await post(`/inventories`, product)
    }
  })
  it('should add a product', async () => {
    const response = await post(`/inventories`, productObject)
      .expect(200);
    expect(response.body.name).toBe(productObject.name);
  })
  it('should get list of Products', async () => {
    const response = await getRequest(`/inventories`)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(1);
  })
  it('should remove the product', async () => {
    const message: string = 'Successfully deleted order!'
    const response = await post(`/inventories`, productObject)
    const deleteResponse = await deleteRequest(`/inventories/${response.body._id}`)
    expect(200);
    expect(deleteResponse.body.message).toBe(message);
  })
  it('update the product', async () => {
    const product = await post(`/inventories`, productObject).expect(200)
    const productUpdateTo = <IProduct>{
      name: "red mug",
      price: 150,
      quantity: 300,
      description: 'this item is so cool',
    }

    const response = await putRequest(`/inventories/${product.body._id}`, productUpdateTo)
      .expect(200);

    // const deleteResponse = await deleteRequest(`/inventories/${response.body._id}`)
    // expect(200);
    expect(response.body.name).toBe(productUpdateTo.name);
  })
})