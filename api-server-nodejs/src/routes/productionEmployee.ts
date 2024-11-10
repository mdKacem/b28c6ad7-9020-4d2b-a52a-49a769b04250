// src/routes/productionEmployee.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import ProductionEmployee from "../models/ProductionEmployee"; // Ensure you import the correct ProductionEmployee model

const productionEmployeeRouter = Router();

// Get all production employees
productionEmployeeRouter.get("/", async (_req, res) => {
  try {
    const productionEmployeeRepository = getRepository(ProductionEmployee);
    const productionEmployees = await productionEmployeeRepository.find({});
    res.json(productionEmployees);
  } catch (error) {
    console.error("Error fetching production employees:", error);
    res
      .status(500)
      .json({ message: "Error fetching production employees", error });
  }
});

// Add a new production employee
productionEmployeeRouter.post("/add", async (req, res) => {
  const productionEmployeeRepository = getRepository(ProductionEmployee);
  const productionEmployee = productionEmployeeRepository.create(req.body);
  await productionEmployeeRepository.save(productionEmployee);
  res.status(201).json(productionEmployee);
});

// Update a production employee
productionEmployeeRouter.put("/:id", async (req, res) => {
  const productionEmployeeRepository = getRepository(ProductionEmployee);
  const productionEmployeeId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await productionEmployeeRepository.update(
      productionEmployeeId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "ProductionEmployee not found" });
    }
    const updatedProductionEmployee =
      await productionEmployeeRepository.findOne(productionEmployeeId);
    if (!updatedProductionEmployee) {
      return res.status(404).json({ message: "ProductionEmployee not found" });
    }
    res.json(updatedProductionEmployee);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating production employee:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating production employee",
          error: error.message,
        });
    } else {
      console.error("Unexpected error updating production employee:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating production employee" });
    }
  }
});

// Delete a production employee
productionEmployeeRouter.delete("/:id", async (req, res) => {
  const productionEmployeeRepository = getRepository(ProductionEmployee);
  const productionEmployeeId = req.params.id;

  try {
    const productionEmployee = await productionEmployeeRepository.findOne(
      productionEmployeeId
    );
    if (!productionEmployee) {
      return res.status(404).json({ message: "ProductionEmployee not found" });
    }
    await productionEmployeeRepository.delete(productionEmployeeId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting production employee:", error.message);
      res
        .status(500)
        .json({
          message: "Error deleting production employee",
          error: error.message,
        });
    } else {
      console.error("Unexpected error deleting production employee:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting production employee" });
    }
  }
});

export default productionEmployeeRouter;
