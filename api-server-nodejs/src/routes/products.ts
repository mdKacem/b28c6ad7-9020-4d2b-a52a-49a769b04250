// src/routes/products.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product"; // Make sure to import the correct Product model

const productsRouter = Router();

// Get all products
productsRouter.get("/", async (_req, res) => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Add a new product
productsRouter.post("/add", async (req, res) => {
  const productRepository = getRepository(Product);
  const product = productRepository.create(req.body);
  await productRepository.save(product);
  res.status(201).json(product);
});

// Update a product
productsRouter.put("/:id", async (req, res) => {
  const productRepository = getRepository(Product);
  const productId = req.params.id;
  try {
    const updatedData = req.body;
    const updateResult = await productRepository.update(productId, updatedData);
    if (updateResult.affected === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await productRepository.findOne(productId);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating product:", error.message);
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    } else {
      console.error("Unexpected error updating product:", error);
      res.status(500).json({ message: "Unexpected error updating product" });
    }
  }
});

// Delete a product
productsRouter.delete("/:id", async (req, res) => {
  const productRepository = getRepository(Product);
  const productId = req.params.id;

  try {
    const product = await productRepository.findOne(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productRepository.delete(productId);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting product:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    } else {
      console.error("Unexpected error deleting product:", error);
      res.status(500).json({ message: "Unexpected error deleting product" });
    }
  }
});

export default productsRouter;
