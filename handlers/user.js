import { User } from "../models/user";

const getOrderHistory = async (userid) => {
    return await new User().readUser(userid).orderList;
}

const updateName = async (requestData) => {
    const userId = requestData.userid;
    const newName = requestData.name;

    userId &&
        newName &&
        await new User().updateName(userId, newName);
}

const updateEmail = async (requestData) => {
    const userId = requestData.userid;
    const newEmail = requestData.email;

    userId &&
        newEmail &&
        await new User().updateName(userId, newEmail);
}

export { getOrderHistory, updateName, updateEmail }
