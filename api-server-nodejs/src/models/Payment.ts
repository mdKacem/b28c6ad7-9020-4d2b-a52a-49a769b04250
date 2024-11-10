// src/models/Payment.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // ManyToOne
} from "typeorm";
//import Customers from "./Customers";
//import Employees from "./Employees";
//import Invoice from "./Invoice";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date", nullable: false })
  paymentDate!: Date;

  @Column({ type: "decimal", nullable: false })
  amount!: number; // Total amount of the payment

  @Column({ type: "varchar", length: 50, nullable: false })
  paymentMethod!: string; // Method used for the payment

  @Column({ type: "varchar", length: 20, nullable: true })
  paymentStatus?: string; // Status of the payment (e.g., Completed, Pending, Failed)

  @Column({ type: "varchar", length: 100, nullable: true })
  referenceNumber?: string; // Reference number for the payment

  //@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //createdAt!: Date; // Timestamp for when the payment was created

  //@Column({
  //type: "timestamp",
  //default: () => "CURRENT_TIMESTAMP",
  //onUpdate: "CURRENT_TIMESTAMP",
  //})
  //updatedAt!: Date; // Timestamp for when the payment was last updated

  //@ManyToOne(() => Customers, (customer) => customer.payments)
  //customer!: Customers;

  //@ManyToOne(() => Employees, (employee) => employee.payments)
  //employee!: Employees;

  //@ManyToOne(() => Invoice, (invoice) => invoice.payments)
  //invoice!: Invoice; // Correctly references Invoice
}
