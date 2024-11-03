// src/routes/machines.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Machines from "../models/Machines";
const machinesRouter = Router();

// Get all machines
machinesRouter.get("/", async (_req, res) => {
  try {
    const machineRepository = getRepository(Machines);
    const machines = await machineRepository.find({});
    res.json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    res.status(500).json({ message: "Error fetching machines", error });
  }
});

// Add a new machine
machinesRouter.post("/add", async (req, res) => {
  const machineRepository = getRepository(Machines);
  const machine = machineRepository.create(req.body);
  await machineRepository.save(machine);
  res.status(201).json(machine);
});

// Update a machine
machinesRouter.put("/:id", async (req, res) => {
  const machineRepository = getRepository(Machines);
  const machineId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await machineRepository.update(machineId, updatedData);
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Machine not found" });
    }
    const updatedMachine = await machineRepository.findOne(machineId);
    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.json(updatedMachine);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating machine:", error.message);
      res
        .status(500)
        .json({ message: "Error updating machine", error: error.message });
    } else {
      console.error("Unexpected error updating machine:", error);
      res.status(500).json({ message: "Unexpected error updating machine" });
    }
  }
});

// Delete a machine
machinesRouter.delete("/:id", async (req, res) => {
  const machineRepository = getRepository(Machines);
  const machineId = req.params.id;

  try {
    const machine = await machineRepository.findOne(machineId);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    await machineRepository.delete(machineId);
    res.status(204).send();
  } catch (error: unknown) {
    // Handle error
    if (error instanceof Error) {
      console.error("Error deleting machine:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting machine", error: error.message });
    } else {
      console.error("Unexpected error deleting machine:", error);
      res.status(500).json({ message: "Unexpected error deleting machine" });
    }
  }
});

export default machinesRouter;
