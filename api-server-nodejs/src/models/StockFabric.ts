// src/models/StockFabric.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Customers from "./Customers";
import Supplier from "./Supplier"; // Import Supplier

@Entity()
export default class StockFabric {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  fabricName!: string;

  @Column({ type: "integer", nullable: false })
  quantityInStock!: number; // Amount of fabric currently available in stock

  @Column({ type: "decimal", nullable: false })
  unitPrice!: number; // Price per unit of fabric

  @Column({ type: "integer", nullable: true })
  reorderLevel?: number; // Optional threshold quantity for reordering

  @ManyToOne(() => Customers, (customer) => customer.stockFabrics)
  customer!: Customers; // Changed the reference to Customers

  @ManyToOne(() => Supplier, (supplier) => supplier.stockFabrics)
  supplier!: Supplier; // Retaining the reference to Supplier

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the stock fabric record was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the stock fabric record was last updated
}
