import * as mongoose from 'mongoose';
import Order from './schema/orderSchema';
import Inventory from './schema/inventorySchema';
const connectDb = () => {
  return mongoose.connect('mongodb://ali:12345678a@ds031857.mlab.com:31857/treez-test', { useNewUrlParser: true, useUnifiedTopology: true });
};
const models = { Order, Inventory };
export { connectDb };

export default models;