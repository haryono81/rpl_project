import { Employee } from "shared-models";
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",  // Change this to your MySQL username
  password: "belajar22",      // Change this to your MySQL password
  database: "rpldb",  // Change this to your database name
  synchronize: true,    // Set to false in production and use migrations
  logging: false,
  entities: [Employee],
});
