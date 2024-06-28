import { Table } from "./ORM/DynamoDB/table";
import { config } from "./_config";
import { userDataModel } from "./dataModel/user";

export class User extends Table {
    constructor() {
        super(config.USER_TABLE_NAME);
    }

    async addNewUser(name, email, salt, passwordhash) {
        const newUser = userDataModel;
        newUser.id = crypto.randomUUID();
        newUser.name = name;
        newUser.email = email;
        newUser.salt = salt;
        newUser.passwordhash = passwordhash;
        newUser.orderList = [];
        await this.create(newUser);
    }

    async readUser(userid) {
        return await this.read({
            "id": userid
        })
    }

    async readUserFromEmail(email) {
        return await this.read({
            "email": email
        })
    }

    async updateName(userId, name) {
        await this._updateTopLevelAttributes(userId, "name", name);
    }

    async updateEmail(userId, email) {
        await this._updateTopLevelAttributes(userId, "email", email);
    }

    async updatePassword(userId, newSalt, newPasswordHash) {
        await this.update({ "id": userId }, `SET salt=:newSalt, passwordhash=:newPasswordHash`, { ":newSalt": newSalt, ":newPasswordHash": newPasswordHash });
    }

    async addOrderToUser(userId, newOrderIds) {
        await this.update({ "id": userId }, "ADD orderList=list_append(orderList, :newOrderIds)", { ":newOrderIds": newOrderIds });
    }

    async removeOrderFromUser(userId, existingOrderIds) {
        await this.update({ "id": userId }, "DELETE orderList :existingOrderIds)", { ":existingOrderIds": existingOrderIds });
    }

    async deleteUser(userId) {
        await this.delete({ "id": userId });
    }
}