// src/models/PaymentMethod.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PaymentMethod {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  paymentMethodName!: string;

  @Column({ type: "text", nullable: true })
  description?: string; // Optional description of the payment method

  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Indicates if the payment method is active

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the payment method was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the payment method was last updated
}
