// src/models/StockYarn.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Supplier from "./Supplier"; // Import Supplier

@Entity()
export default class StockYarn {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  yarnName!: string;

  @Column({ type: "integer", nullable: false })
  quantityInStock!: number; // Amount of yarn currently available in stock

  @Column({ type: "decimal", nullable: false })
  unitPrice!: number; // Price per unit of yarn

  @Column({ type: "integer", nullable: true })
  reorderLevel?: number; // Optional threshold quantity for reordering

  @Column({ type: "text", nullable: true })
  color?: string; // Optional field to specify the color of the yarn

  @ManyToOne(() => Supplier, (supplier) => supplier.stockYarns)
  supplier!: Supplier; // Reference to Supplier

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the stock yarn record was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the stock yarn record was last updated
}
