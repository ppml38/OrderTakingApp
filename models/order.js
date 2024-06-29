const { Table } = require("./ORM/DynamoDB/table");
const { config } = require("./_config");
const { orderDataModel } = require("./dataModel/order");

class Order extends Table {
    constructor() {
        super(config.ORDER_TABLE_NAME);
    }

    async addNewOrder(userid, menuItems = []) {
        const newOrder = orderDataModel;
        newOrder.id = crypto.randomUUID();
        newOrder.userid = userid;
        newOrder.menuItemsList = menuItems;
        await this.create(newOrder);
    }

    async readOrder(orderId) {
        return await this.read({
            "id": orderId
        })
    }

    async updateStatus(orderId, status) {
        await this._updateTopLevelAttributes(orderId, "status", status);
    }

    async addNewMenuItemToOrder(orderId, menuItemId, count) {
        await this.update({ "id": orderId }, "SET menuItems.#menuItemId=:count", { ":count": count }, { "#menuItemId": menuItemId });
    }

    async updateOrderCount(orderId, menuItemId, count) {
        await this.update({ "id": orderId }, "SET menuItems.#menuItemId=:count", { ":count": count }, { "#menuItemId": menuItemId });
    }

    async deleteMenuItemFromOrder(orderId, menuItemId) {
        await this.update({ "id": orderId }, "REMOVE menuItems.#menuItemId", {}, { "#menuItemId": menuItemId });
    }

    async deleteOrder(orderId) {
        await this.delete({ "id": orderId });
    }
}

module.exports = Order