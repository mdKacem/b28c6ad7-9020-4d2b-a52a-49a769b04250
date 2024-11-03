// src/models/PurchaseOrder.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Supplier from "./Supplier";
import Inventory from "./Inventory";

@Entity()
export default class PurchaseOrder {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date", nullable: false })
  purchaseOrderDate!: Date;

  @Column({ type: "integer", nullable: false })
  quantity!: number; // Number of items being ordered

  @Column({ type: "decimal", nullable: false })
  totalAmount!: number; // Total cost of the purchase order

  @Column({ type: "text", nullable: true })
  status?: string; // Optional field for the status of the purchase order

  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseOrders)
  supplier!: Supplier;

  @ManyToOne(() => Inventory, (inventory) => inventory.purchaseOrders)
  inventoryItem!: Inventory;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the purchase order was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the purchase order was last updated
}
