// src/models/Production.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  //ManyToOne,
  //OneToMany,
} from "typeorm"; // Added OneToMany import
//import Machine from "./Machines";
//import Product from "./Product";
//import Customers from "./Customers";
//import ProductionEmployee from "./ProductionEmployee"; // Import ProductionEmployee

@Entity()
export default class Productions {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date", nullable: false })
  productionDate!: Date;

  @Column({ type: "integer", nullable: false })
  quantityProduced!: number; // Number of units produced

  @Column({ type: "text", nullable: true })
  status?: string; // Optional field for the status of production

  @Column({ type: "text", nullable: true })
  shift?: string; // Optional field to specify the shift

  //@ManyToOne(() => Machine, (machine) => machine.productions)
 // machine!: Machine;

  //@ManyToOne(() => Product, (product) => product.productions)
  //product!: Product;

  //@ManyToOne(() => Customers, (customer) => customer.productions)
  //customer!: Customers; // Changed from 'supplier' to 'customer'

  //@OneToMany(
  // () => ProductionEmployee,
  //(productionEmployee) => productionEmployee.production
  //)
  // productionEmployees!: ProductionEmployee[]; // Establish the relationship to ProductionEmployee

  //@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //createdAt!: Date; // Timestamp for when the production record was created

  //@Column({
  // type: "timestamp",
  // default: () => "CURRENT_TIMESTAMP",
  // onUpdate: "CURRENT_TIMESTAMP",
  //})
  //updatedAt!: Date; // Timestamp for when the production record was last updated
}
