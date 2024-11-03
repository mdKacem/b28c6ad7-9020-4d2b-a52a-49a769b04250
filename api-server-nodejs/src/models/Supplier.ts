// src/models/Supplier.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import Inventory from "./Inventory";
import Invoice from "./Invoice";
import PurchaseOrder from "./PurchaseOrder";
import Customers from "./Customers"; // Import Customers
import StockYarn from "./StockYarn"; // Import StockYarn
import StockFabric from "./StockFabric"; // Import StockFabric

@Entity()
export default class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  supplierName!: string;

  @Column({ type: "text", nullable: true })
  contactPerson?: string; // Name of the primary contact person

  @Column({ type: "text", nullable: true })
  contactEmail?: string; // Email address for the contact person

  @Column({ type: "text", nullable: true })
  phoneNumber?: string; // Contact phone number for the supplier

  @Column({ type: "text", nullable: true })
  address?: string; // Physical address of the supplier

  @ManyToOne(() => Customers, (customer) => customer.suppliers)
  customer!: Customers; // Establish relationship back to Customers

  @OneToMany(() => Inventory, (inventory) => inventory.supplier)
  inventoryItems!: Inventory[];

  @OneToMany(() => Invoice, (invoice) => invoice.supplier)
  invoices!: Invoice[];

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.supplier)
  purchaseOrders!: PurchaseOrder[];

  @OneToMany(() => StockYarn, (stockYarn) => stockYarn.supplier)
  stockYarns!: StockYarn[]; // Establish the relationship to StockYarn

  @OneToMany(() => StockFabric, (stockFabric) => stockFabric.supplier)
  stockFabrics!: StockFabric[]; // Establish the relationship to StockFabric

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the supplier record was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the supplier record was last updated
}
