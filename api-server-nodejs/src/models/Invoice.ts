// src/models/Invoice.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"; // Import OneToMany
import Customers from "./Customers";
import Employees from "./Employees";
import Supplier from "./Supplier";
import Payment from "./Payment"; // Import Payment
import OrderDetail from "./OrderDetails";

@Entity()
export default class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true, nullable: false })
  invoiceNumber!: string; // Unique identifier for the invoice

  @Column({ type: "date", nullable: false })
  invoiceDate!: Date;

  @Column({ type: "date", nullable: true })
  dueDate?: Date; // Due date for payment

  @Column({ type: "decimal", nullable: false })
  totalAmount!: number; // Total amount of the invoice

  @Column({ type: "text", nullable: true })
  status?: string; // Status of the invoice (e.g., Paid, Unpaid, Overdue)

  @Column({ type: "text", nullable: true })
  paymentTerms?: string; // Payment terms (e.g., Net 30)

  @Column({ type: "text", nullable: true })
  notes?: string; // Additional notes related to the invoice

  @Column({ type: "decimal", nullable: true })
  taxAmount?: number; // Tax amount charged on the invoice

  @ManyToOne(() => Customers, (customer) => customer.invoices)
  customer!: Customers;

  @ManyToOne(() => Employees, (employee) => employee.invoices)
  employee!: Employees;

  @ManyToOne(() => Supplier, (supplier) => supplier.invoices)
  supplier!: Supplier;

  @OneToMany(() => Payment, (payment) => payment.invoice) // Add this line
  payments!: Payment[]; // Establish the relationship to Payment

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.invoice)
  orderDetails!: OrderDetail[];
}
