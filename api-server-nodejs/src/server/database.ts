import sqlite3 from "sqlite3";
/* eslint-disable import/no-mutable-exports */
import { Connection, ConnectionOptions, createConnection } from "typeorm";

import ActiveSession from "../models/activeSession";
import User from "../models/user";
import Customers from "../models/Customers";
import Employees from "../models/Employees";
import Inventory from "../models/Inventory";
import Machine from "../models/Machines";

if (!process.env.SQLITE_PATH) {
  throw new Error("SQLITE_PATH environment variable is not set.");
}

const options: ConnectionOptions = {
  type: "sqlite",
  database: process.env.SQLITE_PATH,
  entities: [User, ActiveSession, Customers, Employees, Inventory, Machine],
  logging: true,
};

export let connection: Connection | undefined;

export const connect = async (): Promise<Connection | undefined> => {
  try {
    const conn = await createConnection(options);
    connection = conn;
    console.log(
      `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`
    );
  } catch (err) {
    console.log(err);
  }
  return undefined;
};

export const PrepareDB = () => new sqlite3.Database(":memory:");
