// src/routes/inventory.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Inventory from "../models/Inventory"; // Ensure you import the correct Inventory model

const inventoryRouter = Router();

// Get all inventory items
inventoryRouter.get("/", async (_req, res) => {
  try {
    const inventoryRepository = getRepository(Inventory);
    const inventoryItems = await inventoryRepository.find({});
    res.json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: "Error fetching inventory items", error });
  }
});

// Add a new inventory item
inventoryRouter.post("/add", async (req, res) => {
  const inventoryRepository = getRepository(Inventory);
  const inventoryItem = inventoryRepository.create(req.body);
  await inventoryRepository.save(inventoryItem);
  res.status(201).json(inventoryItem);
});

// Update an inventory item
inventoryRouter.put("/:id", async (req, res) => {
  const inventoryRepository = getRepository(Inventory);
  const inventoryId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await inventoryRepository.update(
      inventoryId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    const updatedInventoryItem = await inventoryRepository.findOne(inventoryId);
    if (!updatedInventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.json(updatedInventoryItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating inventory item:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating inventory item",
          error: error.message,
        });
    } else {
      console.error("Unexpected error updating inventory item:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating inventory item" });
    }
  }
});

// Delete an inventory item
inventoryRouter.delete("/:id", async (req, res) => {
  const inventoryRepository = getRepository(Inventory);
  const inventoryId = req.params.id;

  try {
    const inventoryItem = await inventoryRepository.findOne(inventoryId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    await inventoryRepository.delete(inventoryId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting inventory item:", error.message);
      res
        .status(500)
        .json({
          message: "Error deleting inventory item",
          error: error.message,
        });
    } else {
      console.error("Unexpected error deleting inventory item:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting inventory item" });
    }
  }
});

export default inventoryRouter;
