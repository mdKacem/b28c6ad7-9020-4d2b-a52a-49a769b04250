// src/models/Employees.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
import Order from "./Order";
import Invoice from "./Invoice";
import Payment from "./Payment";
import ProductionEmployee from "./ProductionEmployee";

@Entity()
export default class Employees {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  @IsNotEmpty()
  name!: string;

  @Column({ type: "text", nullable: false, unique: true })
  @IsEmail()
  email!: string; // Employee's email address

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsOptional()
  @IsPhoneNumber("US", { message: "Invalid phone number format." }) // Validate for US phone number format
  phoneNumber?: string; // Employee's phone number

  @Column({ type: "text", nullable: true })
  @IsOptional()
  position?: string; // Employee's position or job title

  @Column({ type: "text", nullable: true })
  @IsOptional()
  department?: string; // Employee's department

  @Column({ type: "date", nullable: true })
  @IsOptional()
  dateOfBirth?: Date; // Employee's date of birth

  @Column({ type: "date", nullable: false })
  @IsNotEmpty()
  dateOfHire!: Date; // Employee's hire date

  @Column({ type: "text", nullable: true })
  @IsOptional()
  address?: string; // Employee's address

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  @IsOptional()
  salary?: number; // Employee's salary

  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Status field to indicate if the employee is active

  @OneToMany(() => Order, (order) => order.employee)
  orders!: Order[];

  @OneToMany(() => Invoice, (invoice) => invoice.employee)
  invoices!: Invoice[];

  @OneToMany(() => Payment, (payment) => payment.employee)
  payments!: Payment[];

  @OneToMany(
    () => ProductionEmployee,
    (productionEmployee) => productionEmployee.employee
  )
  productionEmployees!: ProductionEmployee[];
}
