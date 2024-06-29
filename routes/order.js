var express = require('express');
const { getOrder, addOrder, removeMenuItem, addMenuItem, updateCount, updateStatus } = require('../handlers/order');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - userid
 *         - status
 *         - cost
 *         - orderTimestamp
 *         - menuItemsList
 *       properties:
 *         id:
 *           type: string
 *           description: The GUUID of the menu
 *         userid:
 *           type: string
 *           description: The id of the user who placed this order
 *         status:
 *           type: string
 *           description: Current status of the order
 *         cost:
 *           type: number
 *           description: Total cost of the order, including tax, and other fees
 *         orderTimestamp:
 *           type: string
 *           format: date
 *           description: Epoch/UTC Timestamp when the order was placed
 *         menuItemsList:
 *           type: object
 *           properties:
 *             menuItemId:
 *               type: string
 *               description: id of the menu item in this order as key and its quantity as value
 *           description: List of IDs of the menu items under this order along with their corresponding quantity
 *     UpdateOrderCountRequestPostBody:
 *       type: object
 *       required:
 *         - orderid
 *         - menuItemId
 *         - count
 *       properties:
 *         orderid:
 *           type: string
 *           description: The GUUID of the order
 *         menuItemId:
 *           type: string
 *           description: The GUUID of the menu item
 *         count:
 *           type: number
 *           description: Quantity ordered
 *     UpdateOrderStatusRequestPostBody:
 *       type: object
 *       required:
 *         - orderid
 *         - status
 *       properties:
 *         orderid:
 *           type: string
 *           description: The GUUID of the order
 *         status:
 *           type: string
 *           description: New status of the order
 *     UpdateOrderCostRequestPostBody:
 *       type: object
 *       required:
 *         - orderid
 *         - cost
 *       properties:
 *         orderid:
 *           type: string
 *           description: The GUUID of the order
 *         cost:
 *           type: string
 *           description: Total cost of the order
 *     AddOrderItemRequestPostBody:
 *       type: object
 *       required:
 *         - orderid
 *         - menuItemId
 *         - count
 *       properties:
 *         orderid:
 *           type: string
 *           description: The GUUID of the order
 *         menuItemId:
 *           type: string
 *           description: ID of the new menu item
 *         count:
 *           type: number
 *           description: quantity of the item ordered
 *     RemoveOrderItemRequestPostBody:
 *       type: object
 *       required:
 *         - orderid
 *         - menuitemid
 *       properties:
 *         orderid:
 *           type: string
 *           description: The GUUID of the order
 *         menuItemId:
 *           type: string
 *           description: ID of the menu item to remove
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/getOrder:
 *   get:
 *     summary: Read order with order id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderid
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: Order requested
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *       500:
 *         description: Some error happened
 *
 */
router.get('/getOrder', function (req, res, next) {
    getOrder(req.query.orderid).then((order) => {
        res.send(order);
    })
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/addOrder:
 *   post:
 *     summary: Place new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/addOrder', function (req, res, next) {
    addOrder(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/addMenuItem:
 *   post:
 *     summary: Add new menu item to the order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddOrderItemRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/addMenuItem', function (req, res, next) {
    addMenuItem(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/removeMenuItem:
 *   post:
 *     summary: Remove menu item from the order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveOrderItemRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/removeMenuItem', function (req, res, next) {
    removeMenuItem(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/updateCount:
 *   post:
 *     summary: Update the count of menu item in the order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderCountRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateCount', function (req, res, next) {
    updateCount(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/updateCount:
 *   post:
 *     summary: Update the status of order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateStatus', function (req, res, next) {
    updateStatus(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The order managing API
 * /order/updateCost:
 *   post:
 *     summary: Update total cost of the order as we change the items in the order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderCostRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateCost', function (req, res, next) {
    updateStatus(req.body).then(() => {
        res.send("success");
    });
});

module.exports = router;
