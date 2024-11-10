// src/routes/supplier.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Supplier from "../models/Supplier"; // Ensure you import the correct Supplier model

const supplierRouter = Router();

// Get all suppliers
supplierRouter.get("/", async (_req, res) => {
  try {
    const supplierRepository = getRepository(Supplier);
    const suppliers = await supplierRepository.find({});
    res.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
});

// Add a new supplier
supplierRouter.post("/add", async (req, res) => {
  const supplierRepository = getRepository(Supplier);
  const supplier = supplierRepository.create(req.body);
  await supplierRepository.save(supplier);
  res.status(201).json(supplier);
});

// Update a supplier
supplierRouter.put("/:id", async (req, res) => {
  const supplierRepository = getRepository(Supplier);
  const supplierId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await supplierRepository.update(
      supplierId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    const updatedSupplier = await supplierRepository.findOne(supplierId);
    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(updatedSupplier);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating supplier:", error.message);
      res
        .status(500)
        .json({ message: "Error updating supplier", error: error.message });
    } else {
      console.error("Unexpected error updating supplier:", error);
      res.status(500).json({ message: "Unexpected error updating supplier" });
    }
  }
});

// Delete a supplier
supplierRouter.delete("/:id", async (req, res) => {
  const supplierRepository = getRepository(Supplier);
  const supplierId = req.params.id;

  try {
    const supplier = await supplierRepository.findOne(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplierRepository.delete(supplierId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting supplier:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting supplier", error: error.message });
    } else {
      console.error("Unexpected error deleting supplier:", error);
      res.status(500).json({ message: "Unexpected error deleting supplier" });
    }
  }
});

export default supplierRouter;
