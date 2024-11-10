// src/routes/paymentMethod.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import PaymentMethod from "../models/PaymentMethod"; // Ensure you import the correct PaymentMethod model

const paymentMethodRouter = Router();

// Get all payment methods
paymentMethodRouter.get("/", async (_req, res) => {
  try {
    const paymentMethodRepository = getRepository(PaymentMethod);
    const paymentMethods = await paymentMethodRepository.find({});
    res.json(paymentMethods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ message: "Error fetching payment methods", error });
  }
});

// Add a new payment method
paymentMethodRouter.post("/add", async (req, res) => {
  const paymentMethodRepository = getRepository(PaymentMethod);
  const paymentMethod = paymentMethodRepository.create(req.body);
  await paymentMethodRepository.save(paymentMethod);
  res.status(201).json(paymentMethod);
});

// Update a payment method
paymentMethodRouter.put("/:id", async (req, res) => {
  const paymentMethodRepository = getRepository(PaymentMethod);
  const paymentMethodId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await paymentMethodRepository.update(
      paymentMethodId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    const updatedPaymentMethod = await paymentMethodRepository.findOne(
      paymentMethodId
    );
    if (!updatedPaymentMethod) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    res.json(updatedPaymentMethod);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating payment method:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating payment method",
          error: error.message,
        });
    } else {
      console.error("Unexpected error updating payment method:", error);
      res
        .status(500)
        .json({ message: "Unexpected error updating payment method" });
    }
  }
});

// Delete a payment method
paymentMethodRouter.delete("/:id", async (req, res) => {
  const paymentMethodRepository = getRepository(PaymentMethod);
  const paymentMethodId = req.params.id;

  try {
    const paymentMethod = await paymentMethodRepository.findOne(
      paymentMethodId
    );
    if (!paymentMethod) {
      return res.status(404).json({ message: "PaymentMethod not found" });
    }
    await paymentMethodRepository.delete(paymentMethodId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting payment method:", error.message);
      res
        .status(500)
        .json({
          message: "Error deleting payment method",
          error: error.message,
        });
    } else {
      console.error("Unexpected error deleting payment method:", error);
      res
        .status(500)
        .json({ message: "Unexpected error deleting payment method" });
    }
  }
});

export default paymentMethodRouter;
