var express = require('express');
const { getMenuItem, addMenuItem, updateName, updateDescription, updateCategory, updatePrice } = require('../handlers/menuItem');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The GUUID of the menu item
 *         name:
 *           type: string
 *           description: The name of the menu item
 *         description:
 *           type: string
 *           description: Description about the menu item
 *         category:
 *           type: string
 *           description: Category of the menu item
 *         price:
 *           type: number
 *           description: Price of the menu item
 *     UpdateMenuItemNameRequestPostBody:
 *       type: object
 *       required:
 *         - menuItemId
 *         - name
 *       properties:
 *         menuItemId:
 *           type: string
 *           description: The GUUID of the menu item
 *         name:
 *           type: string
 *           description: New name of the menu item
 *     UpdateMenuItemDescriptionRequestPostBody:
 *       type: object
 *       required:
 *         - menuItemId
 *         - description
 *       properties:
 *         menuItemId:
 *           type: string
 *           description: The GUUID of the menu item
 *         description:
 *           type: string
 *           description: New email id of the menu item
 *     UpdateMenuItemCategoryRequestPostBody:
 *       type: object
 *       required:
 *         - menuItemId
 *         - category
 *       properties:
 *         menuItemId:
 *           type: string
 *           description: The GUUID of the menu item
 *         category:
 *           type: string
 *           description: New category of the menu item
 *     UpdateMenuItemPriceRequestPostBody:
 *       type: object
 *       required:
 *         - menuItemId
 *         - price
 *       properties:
 *         menuItemId:
 *           type: string
 *           description: The GUUID of the menu item
 *         price:
 *           type: string
 *           description: New price of the menu item
 */

/**
 * @swagger
 * tags:
 *   name: MenuItem
 *   description: The menu item managing API
 * /menuItem/getMenuItem:
 *   get:
 *     summary: Read menu item with menu item id
 *     tags: [MenuItem]
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item id
 *     responses:
 *       200:
 *         description: Menu item requested
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: The menu was not found
 *       500:
 *         description: Some error happened
 *
 */
router.get('/getMenuItem', function (req, res, next) {
    getMenuItem(req.query.menuitemid).then((menuitem) => {
        res.send(menuitem);
    })
});

/**
 * @swagger
 * tags:
 *   name: MenuItem
 *   description: The menu item managing API
 * /menu/addMenuItem:
 *   post:
 *     summary: Create new menu item
 *     tags: [MenuItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
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
 *   name: MenuItem
 *   description: The menu item managing API
 * /menuItem/updateName:
 *   post:
 *     summary: Update the name of the menu item
 *     tags: [MenuItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuItemNameRequestPostBody'
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
 *   name: MenuItem
 *   description: The menu item managing API
 * /menuItem/updateDescription:
 *   post:
 *     summary: Update the name of the menu item
 *     tags: [MenuItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuItemDescriptionRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 */
router.post('/updateDescription', function (req, res, next) {
    updateDescription(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: MenuItem
 *   description: The menu item managing API
 * /menuItem/updateCategory:
 *   post:
 *     summary: Update the name of the menu item
 *     tags: [MenuItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuItemCategoryRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 */
router.post('/updateCategory', function (req, res, next) {
    updateCategory(req.body).then(() => {
        res.send("success");
    });
});

/**
 * @swagger
 * tags:
 *   name: MenuItem
 *   description: The menu item managing API
 * /menuItem/updatePrice:
 *   post:
 *     summary: Update the name of the menu item
 *     tags: [MenuItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuItemPriceRequestPostBody'
 *     responses:
 *       200:
 *         description: Success response.
 *       500:
 *         description: Some server error
 */
router.post('/updatePrice', function (req, res, next) {
    updatePrice(req.body).then(() => {
        res.send("success");
    });
});

module.exports = router;
