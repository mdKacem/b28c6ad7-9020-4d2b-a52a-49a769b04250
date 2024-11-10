// src/routes/productions.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Production from "../models/Production"; 

const productionsRouter = Router();

// Get all productions
productionsRouter.get("/", async (_req, res) => {
  try {
    const productionRepository = getRepository(Production);
    const productions = await productionRepository.find({});
    res.json(productions);
  } catch (error) {
    console.error("Error fetching productions:", error);
    res.status(500).json({ message: "Error fetching productions", error });
  }
});

// Add a new production
productionsRouter.post("/add", async (req, res) => {
  const productionRepository = getRepository(Production);
  const production = productionRepository.create(req.body);
  await productionRepository.save(production);
  res.status(201).json(production);
});

// Update a production
productionsRouter.put("/:id", async (req, res) => {
  const productionRepository = getRepository(Production);
  const productionId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await productionRepository.update(
      productionId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Production not found" });
    }
    const updatedProduction = await productionRepository.findOne(productionId);
    if (!updatedProduction) {
      return res.status(404).json({ message: "Production not found" });
    }
    res.json(updatedProduction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating production:", error.message);
      res
        .status(500)
        .json({ message: "Error updating production", error: error.message });
    } else {
      console.error("Unexpected error updating production:", error);
      res.status(500).json({ message: "Unexpected error updating production" });
    }
  }
});

// Delete a production
productionsRouter.delete("/:id", async (req, res) => {
  const productionRepository = getRepository(Production);
  const productionId = req.params.id;

  try {
    const production = await productionRepository.findOne(productionId);
    if (!production) {
      return res.status(404).json({ message: "Production not found" });
    }
    await productionRepository.delete(productionId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting production:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting production", error: error.message });
    } else {
      console.error("Unexpected error deleting production:", error);
      res.status(500).json({ message: "Unexpected error deleting production" });
    }
  }
});

export default productionsRouter;
