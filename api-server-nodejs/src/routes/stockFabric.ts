// src/routes/stockFabric.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import StockFabric from "../models/StockFabric"; // Ensure you import the correct StockFabric model

const stockFabricRouter = Router();

// Get all stock fabrics
stockFabricRouter.get("/", async (_req, res) => {
  try {
    const stockFabricRepository = getRepository(StockFabric);
    const stockFabrics = await stockFabricRepository.find({});
    res.json(stockFabrics);
  } catch (error) {
    console.error("Error fetching stock fabrics:", error);
    res.status(500).json({ message: "Error fetching stock fabrics", error });
  }
});

// Add a new stock fabric
stockFabricRouter.post("/add", async (req, res) => {
  const stockFabricRepository = getRepository(StockFabric);
  const stockFabric = stockFabricRepository.create(req.body);
  await stockFabricRepository.save(stockFabric);
  res.status(201).json(stockFabric);
});

// Update a stock fabric
stockFabricRouter.put("/:id", async (req, res) => {
  const stockFabricRepository = getRepository(StockFabric);
  const stockFabricId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await stockFabricRepository.update(
      stockFabricId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "StockFabric not found" });
    }
    const updatedStockFabric = await stockFabricRepository.findOne(
      stockFabricId
    );
    if (!updatedStockFabric) {
      return res.status(404).json({ message: "StockFabric not found" });
    }
    res.json(updatedStockFabric);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating stock fabric:", error.message);
      res
        .status(500)
        .json({ message: "Error updating stock fabric", error: error.message });
    } else {
      console.error("Unexpected error updating stock fabric:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating stock fabric" });
    }
  }
});

// Delete a stock fabric
stockFabricRouter.delete("/:id", async (req, res) => {
  const stockFabricRepository = getRepository(StockFabric);
  const stockFabricId = req.params.id;

  try {
    const stockFabric = await stockFabricRepository.findOne(stockFabricId);
    if (!stockFabric) {
      return res.status(404).json({ message: "StockFabric not found" });
    }
    await stockFabricRepository.delete(stockFabricId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting stock fabric:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting stock fabric", error: error.message });
    } else {
      console.error("Unexpected error deleting stock fabric:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting stock fabric" });
    }
  }
});

export default stockFabricRouter;
