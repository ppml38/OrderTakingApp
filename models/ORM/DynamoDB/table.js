const AWS = require('aws-sdk');
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

class Table {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async create(record) {
        const parameters = {
            TableName: this.tableName,
            Item: record
        };
        await dynamoDBClient.put(parameters).promise();
    }

    async read(key) {
        const parameters = {
            TableName: this.tableName,
            Key: key
        };
        const result = await dynamoDBClient.get(parameters).promise();
        return result.Item || null;
    }

    async update(key, updateExpression, expressionAttributeValues={}, expressionAttributeNames={}) {
        const parameters = {
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues
        };
        await dynamoDBClient.update(parameters).promise();
    }

    async _updateTopLevelAttributes(id, attributeName, attributeValue) {
        const valuemap = {};
        valuemap[`:${attributeName}`] = attributeValue;
        await this.update({ "id": id }, `SET ${attributeName}=:${attributeName}`, valuemap);
    }

    async delete(key) {
        const parameters = {
            TableName: this.tableName,
            Key: key
        };
        await dynamoDBClient.delete(parameters).promise();
    }
}

export { Table };