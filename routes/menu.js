var express = require('express');
const { getMenu, addMenuItem, removeMenuItem, updateName, updateDescription } = require('../handlers/menu');
var router = express.Router();

router.get('/getMenu', function (req, res, next) {
    getMenu(req.query.menuid).then((menu) => {
        res.send(menu);
    })
});

router.post('/addMenuItem', function (req, res, next) {
    addMenuItem(req.body).then(() => {
        res.send("success");
    });
});

router.post('/removeMenuItem', function (req, res, next) {
    removeMenuItem(req.body).then(() => {
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

module.exports = router;
