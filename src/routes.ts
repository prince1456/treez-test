import {createItem, deleteItem, getItem, getItems, updateItem} from "./controllers/inventory";
import {createOrder, deleteOrder, getOrder, getOrders, updateOrder} from "./controllers/orders";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/inventories",
        method: "get",
        action: getItems
    },
    {
        path: "/inventories",
        method: "post",
        action: createItem
    },
    {
        path: "/inventories/:productId",
        method: "get",
        action: getItem
    },
    {
        path: "/inventories/:productId",
        method: "put",
        action: updateItem
    },
    {
        path: "/inventories/:productId",
        method: "delete",
        action: deleteItem
    },
    {
        path: "/orders",
        method: "get",
        action: getOrders
    },
    {
        path: "/orders",
        method: "post",
        action: createOrder
    },
    {
        path: "/orders/:orderId",
        method: "get",
        action: getOrder
    },
    {
        path:  "/orders/:orderId",
        method: "put",
        action: updateOrder
    },
    {
        path:  "/orders/:orderId",
        method: "delete",
        action: deleteOrder
    },
];
