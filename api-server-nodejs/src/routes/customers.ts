// src/routes/customers.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Customers from "../models/Customers";

const customersRouter = Router();

// Get all customers
customersRouter.get("/", async (_req, res) => {
  try {
    const customerRepository = getRepository(Customers);
    const customers = await customerRepository.find({});
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

// Add a new customer
customersRouter.post("/add", async (req, res) => {
  const customerRepository = getRepository(Customers);
  const customer = customerRepository.create(req.body);
  await customerRepository.save(customer);
  res.status(201).json(customer);
});

// Update a customer
customersRouter.put("/:id", async (req, res) => {
  const customerRepository = getRepository(Customers);
  const customerId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await customerRepository.update(
      customerId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedCustomer = await customerRepository.findOne(customerId);
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating customer:", error.message);
      res
        .status(500)
        .json({ message: "Error updating customer", error: error.message });
    } else {
      console.error("Unexpected error updating customer:", error);
      res.status(500).json({ message: "Unexpected error updating customer" });
    }
  }
});

// Delete a customer
customersRouter.delete("/:id", async (req, res) => {
  const customerRepository = getRepository(Customers);
  const customerId = req.params.id;

  try {
    const customer = await customerRepository.findOne(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customerRepository.delete(customerId);
    res.status(204).send();
  } catch (error: unknown) {
    // Handle error
    if (error instanceof Error) {
      console.error("Error deleting customer:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting customer", error: error.message });
    } else {
      console.error("Unexpected error deleting customer:", error);
      res.status(500).json({ message: "Unexpected error deleting customer" });
    }
  }
});
export default customersRouter;
