// src/routes/paymentStatus.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import PaymentStatus from "../models/PaymentStatus"; // Ensure you import the correct PaymentStatus model

const paymentStatusRouter = Router();

// Get all payment statuses
paymentStatusRouter.get("/", async (_req, res) => {
  try {
    const paymentStatusRepository = getRepository(PaymentStatus);
    const paymentStatuses = await paymentStatusRepository.find({});
    res.json(paymentStatuses);
  } catch (error) {
    console.error("Error fetching payment statuses:", error);
    res.status(500).json({ message: "Error fetching payment statuses", error });
  }
});

// Add a new payment status
paymentStatusRouter.post("/add", async (req, res) => {
  const paymentStatusRepository = getRepository(PaymentStatus);
  const paymentStatus = paymentStatusRepository.create(req.body);
  await paymentStatusRepository.save(paymentStatus);
  res.status(201).json(paymentStatus);
});

// Update a payment status
paymentStatusRouter.put("/:id", async (req, res) => {
  const paymentStatusRepository = getRepository(PaymentStatus);
  const paymentStatusId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await paymentStatusRepository.update(
      paymentStatusId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "PaymentStatus not found" });
    }
    const updatedPaymentStatus = await paymentStatusRepository.findOne(
      paymentStatusId
    );
    if (!updatedPaymentStatus) {
      return res.status(404).json({ message: "PaymentStatus not found" });
    }
    res.json(updatedPaymentStatus);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating payment status:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating payment status",
          error: error.message,
        });
    } else {
      console.error("Unexpected error updating payment status:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating payment status" });
    }
  }
});

// Delete a payment status
paymentStatusRouter.delete("/:id", async (req, res) => {
  const paymentStatusRepository = getRepository(PaymentStatus);
  const paymentStatusId = req.params.id;

  try {
    const paymentStatus = await paymentStatusRepository.findOne(
      paymentStatusId
    );
    if (!paymentStatus) {
      return res.status(404).json({ message: "PaymentStatus not found" });
    }
    await paymentStatusRepository.delete(paymentStatusId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting payment status:", error.message);
      res
        .status(500)
        .json({
          message: "Error deleting payment status",
          error: error.message,
        });
    } else {
      console.error("Unexpected error deleting payment status:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting payment status" });
    }
  }
});

export default paymentStatusRouter;
