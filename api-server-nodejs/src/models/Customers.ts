// src/models/Customers.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
//import Order from "./Order";
//import Invoice from "./Invoice";
//import Payment from "./Payment";
//import Supplier from "./Supplier";
//import Production from "./Production";
//import StockFabric from "./StockFabric";

@Entity()
export default class Customers {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  @IsNotEmpty()
  name!: string;

  @Column({ type: "text", nullable: false, unique: true })
  @IsEmail()
  email!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsOptional()
  @IsPhoneNumber("US", { message: "Invalid phone number format." }) // Validate for US phone number format
  phoneNumber?: string;

  //@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //createdAt!: Date;

  //@Column({
  //type: "timestamp",
  //default: () => "CURRENT_TIMESTAMP",
  //onUpdate: "CURRENT_TIMESTAMP",
  //})
  //updatedAt!: Date;
  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Status field

  //@OneToMany(() => Invoice, (invoice) => invoice.customer)
  //invoices!: Invoice[];

  //@OneToMany(() => Payment, (payment) => payment.customer)
  //payments!: Payment[];

  //@OneToMany(() => Supplier, (supplier) => supplier.customer)
  //suppliers!: Supplier[];

  //@OneToMany(() => Production, (production) => production.customer)
  //productions!: Production[];

  //@OneToMany(() => Order, (order) => order.customer)
  //orders!: Order[];

  //@OneToMany(() => StockFabric, (stockFabric) => stockFabric.customer)
  //stockFabrics!: StockFabric[];
}
