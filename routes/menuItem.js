var express = require('express');
const { getMenuItem, addMenuItem, updateName, updateDescription, updateCategory, updatePrice } = require('../handlers/menuItem');
var router = express.Router();

router.get('/getMenuItem', function (req, res, next) {
    getMenuItem(req.query.menuitemid).then((menuitem) => {
        res.send(menuitem);
    })
});

router.post('/addMenuItem', function (req, res, next) {
    addMenuItem(req.body).then(() => {
        res.send("success");
    });
});

router.post('/updateName', function (req, res, next) {
    updateName(req.body).then(() => {
        res.send("success");
    });
});

router.post('/updateDescription', function (req, res, next) {
    updateDescription(req.body).then(() => {
        res.send("success");
    });
});

router.post('/updateCategory', function (req, res, next) {
    updateCategory(req.body).then(() => {
        res.send("success");
    });
});

router.post('/updatePrice', function (req, res, next) {
    updatePrice(req.body).then(() => {
        res.send("success");
    });
});

module.exports = router;
