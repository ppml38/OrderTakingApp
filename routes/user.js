var express = require('express');
const { getOrderHistory, updateName, updateEmail } = require('../handlers/user');
var router = express.Router();

/**
 * Get order history from userid
 * Example: /getOrderHistory?userid=abc123
 */
router.get('/getOrderHistory', function (req, res, next) {
  getOrderHistory(req.query.userid).then((orderHistory) => {
    res.send(orderHistory);
  })
});

router.post('/updateName', function (req, res, next) {
  updateName(req.body).then(() => {
    res.send("success");
  });
});

router.post('/updateEmail', function (req, res, next) {
  updateEmail(req.body).then(() => {
    res.send("success");
  });
});

module.exports = router;
