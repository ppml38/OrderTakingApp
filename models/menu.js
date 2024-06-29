const {Table} = require("./ORM/DynamoDB/table");
const {config} = require("./_config");
const {menuDataModel} = require("./dataModel/menu");

class Menu extends Table {
    constructor() {
        super(config.MENU_TABLE_NAME);
    }

    async addNewMenu(name = "", description = "", menuItems = []) {
        const newMenu = menuDataModel;
        newMenu.id = crypto.randomUUID();
        newMenu.name = name || "DefaultName";
        newMenu.description = description || "DefaultDescription";
        newMenu.menuItemsList = menuItems;
        await this.create(newMenu);
    }

    async readMenu(menuId) {
        return await this.read({
            "id": menuId
        })
    }

    async updateName(menuId, name) {
        await this._updateTopLevelAttributes(menuId, "name", name);
    }

    async updateDescription(menuId, description) {
        await this._updateTopLevelAttributes(menuId, "description", description);
    }

    async addToMenuItemsList(menuId, newMenuItems) {
        await this.update({ "id": menuId }, "ADD menuItems=list_append(menuItems, :newMenuItems)", { ":newMenuItems": newMenuItems });
    }

    async removeFromMenuItemsList(menuId, existingMenuItems) {
        await this.update({ "id": menuId }, "DELETE menuItems :existingMenuItems)", { ":existingMenuItems": existingMenuItems });
    }

    async deleteMenu(menuId) {
        await this.delete({ "id": menuId });
    }
}

module.exports = Menu;