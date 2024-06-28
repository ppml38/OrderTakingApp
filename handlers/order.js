import { Order } from "../models/order"
import { User } from "../models/user";

const getOrder = async(orderid)=>{
    return await new Order().readOrder(orderid);
}

const addOrder = async (requestData) => {
    const userid = requestData.userid;
    const menuItemsList = requestData.menuItemsList;

    userid &&
        menuItemsList &&
        userid.length !== 0 &&
        menuItemsList.length !== 0 &&
        await new Order().addNewOrder(userid, menuItemsList) &&
        await new User().addOrderToUser(userid, menuItemsList);
}

const addMenuItem = async (requestData) => {
    const orderId = requestData.orderid;
    const menuItemId = requestData.menuItemId;
    const count = requestData.count;

    orderId &&
        menuItemId &&
        count &&
        await new Order().addNewMenuItemToOrder(orderId, menuItemId, count);
}

const removeMenuItem = async (requestData) => {
    const orderId = requestData.orderid;
    const menuItemId = requestData.menuItemId;

    orderId &&
        menuItemId &&
        await new Order().deleteMenuItemFromOrder(orderId, menuItemId);
}

const updateCount = async (requestData) => {
    const orderId = requestData.orderid;
    const menuItemId = requestData.menuItemId;
    const count = requestData.count;

    orderId &&
        menuItemId &&
        count &&
        await new Order().updateOrderCount(orderId, menuItemId, count);
}

const updateStatus = async (requestData) => {
    const orderId = requestData.orderid;
    const status = requestData.status;

    orderId &&
        status &&
        await new Order().updateStatus(orderId, status);
}

const deleteOrder = async (requestData) => {
    const userid = requestData.userid;
    const orderId = requestData.orderid;

    userid &&
        orderId &&
        userid.length !== 0 &&
        orderId.length !== 0 &&
        await new Order().deleteOrder(orderId) &&
        await new User().removeOrderFromUser(userid, [orderId]);
}

export { getOrder, addOrder, addMenuItem, removeMenuItem, updateCount, updateStatus, deleteOrder }