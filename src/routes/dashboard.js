var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/dados-membros", function (req, res) {
    dashboardController.obterDadosMembros(req, res);
});

router.get("/kpis", function (req, res) {
    dashboardController.obterKpis(req, res);
});




module.exports = router;
