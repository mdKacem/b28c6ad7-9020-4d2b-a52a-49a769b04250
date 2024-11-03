// src/routes/orderDetails.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import OrderDetail from "../models/OrderDetails"; // Make sure to import the correct OrderDetail model

const orderDetailsRouter = Router();

// Get all order details
orderDetailsRouter.get("/", async (_req, res) => {
  try {
    const orderDetailRepository = getRepository(OrderDetail);
    const orderDetails = await orderDetailRepository.find({});
    res.json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Error fetching order details", error });
  }
});

// Add a new order detail
orderDetailsRouter.post("/add", async (req, res) => {
  const orderDetailRepository = getRepository(OrderDetail);
  const orderDetail = orderDetailRepository.create(req.body);
  await orderDetailRepository.save(orderDetail);
  res.status(201).json(orderDetail);
});

// Update an order detail
orderDetailsRouter.put("/:id", async (req, res) => {
  const orderDetailRepository = getRepository(OrderDetail);
  const orderDetailId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await orderDetailRepository.update(
      orderDetailId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    const updatedOrderDetail = await orderDetailRepository.findOne(
      orderDetailId
    );
    if (!updatedOrderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json(updatedOrderDetail);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating order detail:", error.message);
      res
        .status(500)
        .json({ message: "Error updating order detail", error: error.message });
    } else {
      console.error("Unexpected error updating order detail:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating order detail" });
    }
  }
});

// Delete an order detail
orderDetailsRouter.delete("/:id", async (req, res) => {
  const orderDetailRepository = getRepository(OrderDetail);
  const orderDetailId = req.params.id;

  try {
    const orderDetail = await orderDetailRepository.findOne(orderDetailId);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    await orderDetailRepository.delete(orderDetailId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting order detail:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting order detail", error: error.message });
    } else {
      console.error("Unexpected error deleting order detail:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting order detail" });
    }
  }
});

export default orderDetailsRouter;
