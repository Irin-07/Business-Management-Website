const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCustomer,
  listCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

router.use(protect);
router.route("/").get(listCustomers).post(createCustomer);
router.route("/:id").get(getCustomer).put(updateCustomer).delete(deleteCustomer);

module.exports = router;
