const mongoose = require("mongoose");
const Customer = require("../models/Customer");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\-\s]{7,15}$/;

function validateCustomer(body) {
  const { name, email, phone, address, status } = body;
  if (!name || !email || !phone || !address) return "Name, email, phone and address are required";
  if (!emailRegex.test(email)) return "Enter a valid customer email";
  if (!phoneRegex.test(phone)) return "Enter a valid phone number";
  if (status && !["Active", "Pending", "Completed"].includes(status)) return "Invalid status";
  return null;
}

async function createCustomer(req, res, next) {
  try {
    const message = validateCustomer(req.body);
    if (message) return res.status(400).json({ success: false, message });

    const customer = await Customer.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json({ success: true, customer });
  } catch (error) {
    next(error);
  }
}

async function listCustomers(req, res, next) {
  try {
    const { search = "", status = "" } = req.query;
    const query = { user: req.user._id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } }
      ];
    }

    if (status) query.status = status;

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json({ success: true, customers });
  } catch (error) {
    next(error);
  }
}

async function getCustomer(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid customer ID" });
    }

    const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

    res.json({ success: true, customer });
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    const message = validateCustomer(req.body);
    if (message) return res.status(400).json({ success: false, message });

    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, customer });
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { createCustomer, listCustomers, getCustomer, updateCustomer, deleteCustomer };
