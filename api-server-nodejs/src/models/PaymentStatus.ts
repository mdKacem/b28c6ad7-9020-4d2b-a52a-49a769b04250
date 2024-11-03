// src/models/PaymentStatus.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PaymentStatus {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  paymentStatusName!: string;

  @Column({ type: "text", nullable: true })
  description?: string; // Optional description of the payment status

  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Indicates if the payment status is active

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the payment status was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the payment status was last updated
}
