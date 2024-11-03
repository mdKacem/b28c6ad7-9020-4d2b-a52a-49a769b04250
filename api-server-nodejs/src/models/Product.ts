// src/models/Product.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//import Production from "./Production"; // Import Production
//import OrderDetail from "./OrderDetails";

@Entity()
export default class Products {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  productName!: string;

  @Column({ type: "text", nullable: true })
  description?: string; // Optional description of the product

  @Column({ type: "decimal", nullable: false })
  price!: number; // Price of the product

  @Column({ type: "integer", default: 0 })
  stockQuantity!: number; // Quantity of the product in stock

  @Column({ type: "boolean", default: true })
  isActive!: boolean; // Indicates if the product is active

  //@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //createdAt!: Date; // Timestamp for when the product was created

  //@Column({
  // type: "timestamp",
  // default: () => "CURRENT_TIMESTAMP",
  // onUpdate: "CURRENT_TIMESTAMP",
  //})
  //updatedAt!: Date; // Timestamp for when the product was last updated

  // @OneToMany(() => Production, (production) => production.product)
  //productions!: Production[]; // Establish the relationship to Production

  //@OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  //orderDetails!: OrderDetail[]; // Establish the relationship to OrderDetail
}
