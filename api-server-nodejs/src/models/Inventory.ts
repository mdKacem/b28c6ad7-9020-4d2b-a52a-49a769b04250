// src/models/Inventory.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Supplier from "./Supplier";
import PurchaseOrder from "./PurchaseOrder";

@Entity()
export default class Inventory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  itemName!: string;

  @Column({ type: "text", nullable: true })
  sku?: string; // Stock Keeping Unit

  @Column({ type: "text", nullable: true })
  description?: string; // Description of the item

  @Column({ type: "decimal", nullable: false })
  quantity!: number;

  @Column({ type: "decimal", nullable: false })
  unitPrice!: number; // Price per unit

  @Column({ type: "decimal", nullable: true })
  reorderLevel?: number; // Reorder level for inventory

  @Column({ type: "text", nullable: true })
  category?: string; // Category of the item

  @Column({ type: "date", nullable: true })
  dateAdded?: Date; // Date when the item was added to inventory

  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Status field to indicate if the item is active

  @ManyToOne(() => Supplier, (supplier) => supplier.inventoryItems)
  supplier!: Supplier; // This establishes the relationship back to Supplier

  @OneToMany(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.inventoryItem
  )
  purchaseOrders!: PurchaseOrder[]; // This establishes the relationship to PurchaseOrder
}
