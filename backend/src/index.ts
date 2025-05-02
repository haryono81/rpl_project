import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "./controller/employee.controller";

const app = express();
app.use(express.json());

app.get("/employees", getEmployees);
app.get("/employees/:id", getEmployee);
app.post("/employees", createEmployee);
app.put("/employees/:id", updateEmployee);
app.delete("/employees/:id", deleteEmployee);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});
