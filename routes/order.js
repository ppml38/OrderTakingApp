var express = require('express');
const { getOrder, addOrder, removeMenuItem, addMenuItem, updateCount, updateStatus } = require('../handlers/order');
var router = express.Router();

router.get('/getOrder', function (req, res, next) {
    getOrder(req.query.orderid).then((order) => {
        res.send(order);
    })
});

router.post('/addOrder', function (req, res, next) {
    addOrder(req.body).then(() => {
        res.send("success");
    });
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

router.post('/updateCount', function (req, res, next) {
    updateCount(req.body).then(() => {
        res.send("success");
    });
});

router.post('/updateStatus', function (req, res, next) {
    updateStatus(req.body).then(() => {
        res.send("success");
    });
});

module.exports = router;
