// src/routes/orders.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Orders from "../models/Orders";

const ordersRouter = Router();

// Get all orders
ordersRouter.get("/", async (_req, res) => {
  try {
    const orderRepository = getRepository(Orders);
    const orders = await orderRepository.find({});
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Add a new order
ordersRouter.post("/add", async (req, res) => {
  const orderRepository = getRepository(Orders);
  const order = orderRepository.create(req.body);
  await orderRepository.save(order);
  res.status(201).json(order);
});

// Update an order
ordersRouter.put("/:id", async (req, res) => {
  const orderRepository = getRepository(Orders);
  const orderId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await orderRepository.update(orderId, updatedData);
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    const updatedOrder = await orderRepository.findOne(orderId);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating order:", error.message);
      res.status(500).json({ message: "Error updating order", error: error.message });
    } else {
      console.error("Unexpected error updating order:", error);
      res.status(500).json({ message: "Unexpected error updating order" });
    }
  }
});

// Delete an order
ordersRouter.delete("/:id", async (req, res) => {
  const orderRepository = getRepository(Orders);
  const orderId = req.params.id;

  try {
    const order = await orderRepository.findOne(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await orderRepository.delete(orderId);
    res.status(204).send();
  } catch (error: unknown) {
    // Handle error
    if (error instanceof Error) {
      console.error("Error deleting order:", error.message);
      res.status(500).json({ message: "Error deleting order", error: error.message });
    } else {
      console.error("Unexpected error deleting order:", error);
      res.status(500).json({ message: "Unexpected error deleting order" });
    }
  }
});

export default ordersRouter;