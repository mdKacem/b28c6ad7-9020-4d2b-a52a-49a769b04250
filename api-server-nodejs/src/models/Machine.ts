// src/models/Machine.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Production from "./Production";

@Entity()
export default class Machine {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  machineType!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  machineName!: string; // Descriptive name for the machine

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  serialNumber!: string; // Unique identifier for the machine

  @Column({ type: "date", nullable: true })
  purchaseDate?: Date; // Date when the machine was purchased

  @Column({ type: "varchar", length: 100, nullable: true })
  location?: string; // Physical location of the machine

  @Column({ type: "varchar", length: 20, nullable: true })
  status?: string; // Operational status of the machine (e.g., Operational, Under Maintenance)

  @Column({ type: "date", nullable: true })
  lastMaintenanceDate?: Date; // Last maintenance date for the machine

  @Column({ type: "text", nullable: true })
  description?: string; // Detailed description of the machine

  @OneToMany(() => Production, (production) => production.machine)
  productions!: Production[]; // Link to Productions
}
