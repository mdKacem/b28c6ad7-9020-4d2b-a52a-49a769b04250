// src/routes/payment.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Payment from "../models/Payment"; // Ensure you import the correct Payment model

const paymentRouter = Router();

// Get all payments
paymentRouter.get("/", async (_req, res) => {
  try {
    const paymentRepository = getRepository(Payment);
    const payments = await paymentRepository.find({});
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error fetching payments", error });
  }
});

// Add a new payment
paymentRouter.post("/add", async (req, res) => {
  const paymentRepository = getRepository(Payment);
  const payment = paymentRepository.create(req.body);
  await paymentRepository.save(payment);
  res.status(201).json(payment);
});

// Update a payment
paymentRouter.put("/:id", async (req, res) => {
  const paymentRepository = getRepository(Payment);
  const paymentId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await paymentRepository.update(paymentId, updatedData);
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    const updatedPayment = await paymentRepository.findOne(paymentId);
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(updatedPayment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating payment:", error.message);
      res
        .status(500)
        .json({ message: "Error updating payment", error: error.message });
    } else {
      console.error("Unexpected error updating payment:", error);
      res.status(500).json({ message: "Unexpected error updating payment" });
    }
  }
});

// Delete a payment
paymentRouter.delete("/:id", async (req, res) => {
  const paymentRepository = getRepository(Payment);
  const paymentId = req.params.id;

  try {
    const payment = await paymentRepository.findOne(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await paymentRepository.delete(paymentId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting payment:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting payment", error: error.message });
    } else {
      console.error("Unexpected error deleting payment:", error);
      res.status(500).json({ message: "Unexpected error deleting payment" });
    }
  }
});

export default paymentRouter;
