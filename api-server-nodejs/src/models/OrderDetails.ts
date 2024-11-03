// src/models/OrderDetail.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//import Orders from "./Orders";
//import Product from "./Product";
//import Invoice from "./Invoice";

@Entity()
export default class OrderDetails {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column({ type: "integer", nullable: false })
  quantity!: number; // Number of units of the product ordered
  
  @Column({ type: "decimal", nullable: false })
  unitPrice!: number; // Price per unit of the product
  
  @Column({ type: "decimal", nullable: false })
  totalPrice!: number; // Total price for this line item
  
  @Column({ type: "decimal", nullable: true })
  discount?: number; // Any discount applied to this order detail item
  
  @Column({ type: "decimal", nullable: true })
  taxAmount?: number; // Tax amount applicable to this order detail item
  
  //@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  //createdAt!: Date; // Timestamp for when the order detail was createdF
  
  //@Column({
   // type: "timestamp",
    //default: () => "CURRENT_TIMESTAMP",
    //onUpdate: "CURRENT_TIMESTAMP",
  //})
  //updatedAt!: Date; // Timestamp for when the order detail was last updated
  
    //@ManyToOne(() => Orders, (orders) => orders.orderDetails)
    //order!: Orders;
  
    //@ManyToOne(() => Product, (product) => product.orderDetails)
    //product!: Product;
  
    //@ManyToOne(() => Invoice, (invoice) => invoice.orderDetails)
    //invoice!: Invoice;
}
