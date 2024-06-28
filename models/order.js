import { Table } from "./ORM/DynamoDB/table";
import { config } from "./_config";
import { orderDataModel } from "./dataModel/order";

export class Order extends Table {
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