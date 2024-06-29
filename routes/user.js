var express = require('express');
const { getOrderHistory, updateName, updateEmail } = require('../handlers/user');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - salt
 *         - passwordhash
 *       properties:
 *         id:
 *           type: string
 *           description: The GUUID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: User's email id
 *         salt:
 *           type: string
 *           description: Random salt used while creating password hash
 *         passwordhash:
 *           type: string
 *           description: Password hash created using salt and hash from frontend
 *         orderList:
 *           type: array
 *           description: List of IDs of the order placed by this user
 *       example:
 *         id: abd123
 *         email: example@example.cm
 *         name: Mr.Example
 *         salt: abcdefg1234
 *         passwordhash: abcdeabcde12341234
 *         orderList: [abc123, bcd123]
 *     UpdateNameRequestPostBody:
 *       type: object
 *       required:
 *         - userid
 *         - name
 *       properties:
 *         userid:
 *           type: string
 *           description: The GUUID of the user
 *         name:
 *           type: string
 *           description: New name of the user
 *     UpdateEmailRequestPostBody:
 *       type: object
 *       required:
 *         - userid
 *         - email
 *       properties:
 *         userid:
 *           type: string
 *           description: The GUUID of the user
 *         email:
 *           type: string
 *           description: New email id of the user
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /user/getOrderHistory:
 *   get:
 *     summary: Get list of orders placed by this user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 *
 */
router.get('/getOrderHistory', function (req, res, next) {
  getOrderHistory(req.query.userid).then((orderHistory) => {
    res.send(orderHistory);
  })
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /user/updateName:
 *   post:
 *     summary: Update the name of the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNameRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateName', function (req, res, next) {
  updateName(req.body).then(() => {
    res.send("success");
  });
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /user/updateEmail:
 *   post:
 *     summary: Update the email id of the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmailRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateEmail', function (req, res, next) {
  updateEmail(req.body).then(() => {
    res.send("success");
  });
});

module.exports = router;
