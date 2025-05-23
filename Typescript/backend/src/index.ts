import express from "express";
import cors from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "./controller/employee.controller";


const app = express();
app.use(cors()); 
app.use(express.json());

app.get("/employees", getEmployees);
app.get("/employees/:id", getEmployee);
app.post("/employees", createEmployee);
app.post("/employees/update/:id", updateEmployee);
app.delete("/employees/:id", deleteEmployee);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});
