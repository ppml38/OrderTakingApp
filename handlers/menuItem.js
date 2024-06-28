import { MenuItem } from "../models/menuItem"

const getMenuItem = async(menuItemId)=>{
    return await new MenuItem().readMenuItem(menuItemId);
}

const addMenuItem = async (requestData) => {
    const name = requestData.name;
    const description = requestData.description;
    const category = requestData.category;
    const price = requestData.price;

    name &&
        description &&
        category &&
        price &&
        name.length !== 0 &&
        description.length !== 0 &&
        category.length !== 0 &&
        await new MenuItem().addNewMenuItem(name, description, category, price);
}

const updateName = async (requestData) => {
    const menuItemId = requestData.id;
    const newName = requestData.name;

    menuItemId &&
        newName &&
        await new MenuItem().updateName(menuItemId, newName);
}

const updateDescription = async (requestData) => {
    const menuItemId = requestData.id;
    const newDescription = requestData.description;

    menuItemId &&
        newDescription &&
        await new MenuItem().updateName(menuItemId, newDescription);
}

const updateCategory = async (requestData) => {
    const menuItemId = requestData.id;
    const newCategory = requestData.category;

    menuItemId &&
        newCategory &&
        await new MenuItem().updateCategory(menuItemId, newCategory);
}

const updatePrice = async (requestData) => {
    const menuItemId = requestData.id;
    const newPrice = requestData.price;

    menuItemId &&
        newPrice &&
        await new MenuItem().updatePrice(menuItemId, newPrice);
}

export { getMenuItem, addMenuItem, updateName, updateDescription, updateCategory, updatePrice }