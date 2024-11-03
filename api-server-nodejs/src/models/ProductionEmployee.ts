// src/models/ProductionEmployee.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import Production from "./Production"; // Import Production model
import Employees from "./Employees"; // Import Employees model

@Entity()
export default class ProductionEmployee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Production, (production) => production.productionEmployees, {
    nullable: false,
  })
  production!: Production; // Link to Production

  @ManyToOne(() => Employees, (employee) => employee.productionEmployees, {
    nullable: false,
  })
  employee!: Employees; // Link to Employee

  @Column({ type: "text", nullable: true })
  role?: string; // Optional field to specify the employee's role in production

  @Column({ type: "decimal", nullable: true })
  hoursWorked?: number; // Optional field to record hours worked

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Timestamp for when the relationship was created

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date; // Timestamp for when the relationship was last updated
}
