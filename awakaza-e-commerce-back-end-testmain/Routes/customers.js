const express = require("express");
const router = express.Router();
const customers = require("../services/customers");


router.get("/", async function (req, res, next) {
  try {
    res.json(await customers.getMultiple());
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await customers.create(req.body));
  } catch (err) {
    console.error(`Error adding customer`, err.message);
    next(err);
  }
});


router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await customers.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting customer`, err.message);
    next(err);
  }
});


router.put("/:id", async function (req, res, next) {
  try {
    res.json(await customers.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating customer`, err.message);
    next(err);
  }
});

module.exports = router;
