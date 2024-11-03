// src/models/Order.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Customers from "./Customers";
import Employees from "./Employees";
import OrderDetail from "./OrderDetail";

@Entity()
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true, nullable: false })
  orderNumber!: string; // Unique identifier for the order

  @Column({ type: "date", nullable: false })
  orderDate!: Date;

  @Column({ type: "decimal", nullable: false })
  totalAmount!: number; // Total amount for the order

  @Column({ type: "text", nullable: true })
  status?: string; // Status of the order (e.g., Pending, Shipped, Delivered)

  @Column({ type: "text", nullable: true })
  shippingAddress?: string; // Shipping address for the order

  @Column({ type: "text", nullable: true })
  billingAddress?: string; // Billing address for the order

  @Column({ type: "text", nullable: true })
  paymentMethod?: string; // Payment method used for the order

  @Column({ type: "text", nullable: true })
  orderNotes?: string; // Additional notes related to the order

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the order was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the order was last updated

  @ManyToOne(() => Customers, (customer) => customer.orders)
  customer!: Customers;

  @ManyToOne(() => Employees, (employee) => employee.orders)
  employee!: Employees;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[]; // Establish the relationship to OrderDetail
}
