import { Menu } from "../models/menu"

const getMenu = async(menuid)=>{
    return await new Menu().readMenu(menuid);
}

const addMenu = async (requestData) => {
    const name = requestData.name;
    const description = requestData.description;
    const menuItems = requestData.menuItems;

    name &&
        description &&
        menuItems &&
        name.length !== 0 &&
        description.length !== 0 &&
        await new Menu().addNewMenu(name, description, menuItems);
}

const addMenuItem = async (requestData) => {
    const menuId = requestData.menuid;
    const menuItemsList = requestData.menuItemId;

    menuId &&
        menuItemsList &&
        await new Menu().addToMenuItemsList(menuId, menuItemsList)
}

const removeMenuItem = async (requestData) => {
    const menuId = requestData.menuid;
    const menuItemsList = requestData.menuItemId;

    menuId &&
        menuItemsList &&
        await new Menu().removeFromMenuItemsList(menuId, menuItemsList)
}

const updateName = async (requestData) => {
    const menuId = requestData.menuid;
    const newName = requestData.name;

    menuId &&
        newName &&
        await new Menu().updateName(menuId, newName)
}

const updateDescription = async (requestData) => {
    const menuId = requestData.menuid;
    const newDescription = requestData.description;

    menuId &&
        newName &&
        await new Menu().updateName(menuId, newDescription)
}

export { getMenu, addMenu, addMenuItem, removeMenuItem, updateName, updateDescription }