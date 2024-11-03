// src/routes/employees.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Employees from "../models/Employees"; // Assuming you have an Employees model

const employeesRouter = Router();

// Get all employees
employeesRouter.get("/", async (_req, res) => {
  try {
    const employeeRepository = getRepository(Employees);
    const employees = await employeeRepository.find({});
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Add a new employee
employeesRouter.post("/add", async (req, res) => {
  const employeeRepository = getRepository(Employees);
  const employee = employeeRepository.create(req.body);
  await employeeRepository.save(employee);
  res.status(201).json(employee);
});

// Update an employee
employeesRouter.put("/:id", async (req, res) => {
  const employeeRepository = getRepository(Employees);
  const employeeId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await employeeRepository.update(
      employeeId,
      updatedData
    );
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await employeeRepository.findOne(employeeId);
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating employee:", error.message);
      res
        .status(500)
        .json({ message: "Error updating employee", error: error.message });
    } else {
      console.error("Unexpected error updating employee:", error);
      res.status(500).json({ message: "Unexpected error updating employee" });
    }
  }
});

// Delete an employee
employeesRouter.delete("/:id", async (req, res) => {
  const employeeRepository = getRepository(Employees);
  const employeeId = req.params.id;

  try {
    const employee = await employeeRepository.findOne(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employeeRepository.delete(employeeId);
    res.status(204).send();
  } catch (error: unknown) {
    // Handle error
    if (error instanceof Error) {
      console.error("Error deleting employee:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting employee", error: error.message });
    } else {
      console.error("Unexpected error deleting employee:", error);
      res.status(500).json({ message: "Unexpected error deleting employee" });
    }
  }
});

export default employeesRouter;
