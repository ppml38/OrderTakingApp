const { Table } = require("./ORM/DynamoDB/table");
const { config } = require("./_config");
const { menuItemDataModel } = require("./dataModel/menuItem");

class MenuItem extends Table {
    constructor() {
        super(config.MENU_ITEM_TABLE_NAME);
    }

    async addNewMenuItem(name = "", description = "", category = "", price = 0) {
        const newMenuItem = menuItemDataModel;
        newMenu.id = crypto.randomUUID();
        newMenu.name = name || "DefaultName";
        newMenu.description = description || "DefaultDescription";
        newMenu.category = category || "DefaultCategory";
        newMenu.price = price || 0;
        await this.create(newMenuItem);
    }

    async readMenuItem(menuItemId) {
        return await this.read({
            "id": menuId
        })
    }

    async updateName(menuItemId, name) {
        await this._updateTopLevelAttributes(menuItemId, "name", name);
    }

    async updateDescription(menuItemId, description) {
        await this._updateTopLevelAttributes(menuItemId, "description", description);
    }

    async updateCategory(menuItemId, category) {
        await this._updateTopLevelAttributes(menuItemId, "category", category);
    }

    async updatePrice(menuItemId, price) {
        await this._updateTopLevelAttributes(menuItemId, "price", price);
    }

    async deleteMenuItem(menuItemId) {
        await this.delete({ "id": menuItemId });
    }
}

module.exports = MenuItem;