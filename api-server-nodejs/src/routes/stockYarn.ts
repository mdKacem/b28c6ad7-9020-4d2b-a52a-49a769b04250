// src/routes/stockYarn.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import StockYarn from "../models/StockYarn"; // Ensure you import the correct StockYarn model

const stockYarnRouter = Router();

// Get all stock yarns
stockYarnRouter.get("/", async (_req, res) => {
  try {
    const stockYarnRepository = getRepository(StockYarn);
    const stockYarns = await stockYarnRepository.find({});
    res.json(stockYarns);
  } catch (error) {
    console.error("Error fetching stock yarns:", error);
    res.status(500).json({ message: "Error fetching stock yarns", error });
  }
});

// Add a new stock yarn
stockYarnRouter.post("/add", async (req, res) => {
  const stockYarnRepository = getRepository(StockYarn);
  const stockYarn = stockYarnRepository.create(req.body);
  await stockYarnRepository.save(stockYarn);
  res.status(201).json(stockYarn);
});

// Update a stock yarn
stockYarnRouter.put("/:id", async (req, res) => {
  const stockYarnRepository = getRepository(StockYarn);
  const stockYarnId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await stockYarnRepository.update(
      stockYarnId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "StockYarn not found" });
    }
    const updatedStockYarn = await stockYarnRepository.findOne(stockYarnId);
    if (!updatedStockYarn) {
      return res.status(404).json({ message: "StockYarn not found" });
    }
    res.json(updatedStockYarn);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating stock yarn:", error.message);
      res
        .status(500)
        .json({ message: "Error updating stock yarn", error: error.message });
    } else {
      console.error("Unexpected error updating stock yarn:", error);
      res.status(500).json({ message: "Unexpected error updating stock yarn" });
    }
  }
});

// Delete a stock yarn
stockYarnRouter.delete("/:id", async (req, res) => {
  const stockYarnRepository = getRepository(StockYarn);
  const stockYarnId = req.params.id;

  try {
    const stockYarn = await stockYarnRepository.findOne(stockYarnId);
    if (!stockYarn) {
      return res.status(404).json({ message: "StockYarn not found" });
    }
    await stockYarnRepository.delete(stockYarnId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting stock yarn:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting stock yarn", error: error.message });
    } else {
      console.error("Unexpected error deleting stock yarn:", error);
      res.status(500).json({ message: "Unexpected error deleting stock yarn" });
    }
  }
});

export default stockYarnRouter;
