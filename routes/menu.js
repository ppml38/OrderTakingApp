var express = require('express');
const { getMenu, addMenuItem, removeMenuItem, updateName, updateDescription, addMenu } = require('../handlers/menu');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - menuItemsList
 *       properties:
 *         id:
 *           type: string
 *           description: The GUUID of the menu
 *         name:
 *           type: string
 *           description: The name of the menu
 *         description:
 *           type: string
 *           description: Description of the menu
 *         menuItemsList:
 *           type: array
 *           description: List of IDs of the menu items under this menu
 *     UpdateMenuNameRequestPostBody:
 *       type: object
 *       required:
 *         - menuid
 *         - name
 *       properties:
 *         menuid:
 *           type: string
 *           description: The GUUID of the menu
 *         name:
 *           type: string
 *           description: New name of the menu
 *     UpdateMenuDescriptionRequestPostBody:
 *       type: object
 *       required:
 *         - menuid
 *         - description
 *       properties:
 *         userid:
 *           type: string
 *           description: The GUUID of the menu
 *         email:
 *           type: string
 *           description: description of the menu
 *     AddMenuItemRequestPostBody:
 *       type: object
 *       required:
 *         - menuid
 *         - menuitemid
 *       properties:
 *         userid:
 *           type: string
 *           description: The GUUID of the menu
 *         menuItemId:
 *           type: string
 *           description: ID of the new menu item
 *     RemoveMenuItemRequestPostBody:
 *       type: object
 *       required:
 *         - menuid
 *         - menuitemid
 *       properties:
 *         userid:
 *           type: string
 *           description: The GUUID of the menu
 *         menuItemId:
 *           type: string
 *           description: ID of the menu item to remove
 */

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: The menu managing API
 * /menu/getMenu:
 *   get:
 *     summary: Read menu with menu id
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu id
 *     responses:
 *       200:
 *         description: Menu requested
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: The menu was not found
 *       500:
 *         description: Some error happened
 *
 */
router.get('/getMenu', function (req, res, next) {
    getMenu(req.query.menuid).then((menu) => {
        res.send(menu);
    })
});

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: The menu managing API
 * /menu/addMenu:
 *   post:
 *     summary: Create new menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/addMenu', function (req, res, next) {
    addMenu(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: The menu managing API
 * /menu/addMenuItem:
 *   post:
 *     summary: Add new menu item to the menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMenuItemRequestPostBody'
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
 *   name: Menu
 *   description: The menu managing API
 * /menu/removeMenuItem:
 *   post:
 *     summary: Remove menu item from the menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveMenuItemRequestPostBody'
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
 *   name: Menu
 *   description: The menu managing API
 * /menu/updateName:
 *   post:
 *     summary: Update the name of the menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuNameRequestPostBody'
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
 *   name: Menu
 *   description: The menu managing API
 * /menu/updateDescription:
 *   post:
 *     summary: Update the description of the menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuDescriptionRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 *
 */
router.post('/updateDescription', function (req, res, next) {
    updateDescription(req.body).then(() => {
        res.send("success");
    });
});

module.exports = router;
