// src/routes/purchaseOrder.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import PurchaseOrder from "../models/PurchaseOrder"; // Ensure you import the correct PurchaseOrder model

const purchaseOrderRouter = Router();

// Get all purchase orders
purchaseOrderRouter.get("/", async (_req, res) => {
  try {
    const purchaseOrderRepository = getRepository(PurchaseOrder);
    const purchaseOrders = await purchaseOrderRepository.find({});
    res.json(purchaseOrders);
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ message: "Error fetching purchase orders", error });
  }
});

// Add a new purchase order
purchaseOrderRouter.post("/add", async (req, res) => {
  const purchaseOrderRepository = getRepository(PurchaseOrder);
  const purchaseOrder = purchaseOrderRepository.create(req.body);
  await purchaseOrderRepository.save(purchaseOrder);
  res.status(201).json(purchaseOrder);
});

// Update a purchase order
purchaseOrderRouter.put("/:id", async (req, res) => {
  const purchaseOrderRepository = getRepository(PurchaseOrder);
  const purchaseOrderId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await purchaseOrderRepository.update(
      purchaseOrderId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "PurchaseOrder not found" });
    }
    const updatedPurchaseOrder = await purchaseOrderRepository.findOne(
      purchaseOrderId
    );
    if (!updatedPurchaseOrder) {
      return res.status(404).json({ message: "PurchaseOrder not found" });
    }
    res.json(updatedPurchaseOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating purchase order:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating purchase order",
          error: error.message,
        });
    } else {
      console.error("Unexpected error updating purchase order:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating purchase order" });
    }
  }
});

// Delete a purchase order
purchaseOrderRouter.delete("/:id", async (req, res) => {
  const purchaseOrderRepository = getRepository(PurchaseOrder);
  const purchaseOrderId = req.params.id;

  try {
    const purchaseOrder = await purchaseOrderRepository.findOne(
      purchaseOrderId
    );
    if (!purchaseOrder) {
      return res.status(404).json({ message: "PurchaseOrder not found" });
    }
    await purchaseOrderRepository.delete(purchaseOrderId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting purchase order:", error.message);
      res
        .status(500)
        .json({
          message: "Error deleting purchase order",
          error: error.message,
        });
    } else {
      console.error("Unexpected error deleting purchase order:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting purchase order" });
    }
  }
});

export default purchaseOrderRouter;
