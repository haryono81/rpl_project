import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

import { Employee } from "shared-models";

const repo = AppDataSource.getRepository(Employee);

export const getEmployees = async (_: Request, res: Response) => {
  const employees = await repo.find();
  res.json(employees);
};

export const getEmployee = async (req: Request, res: Response) => {
  const employee = await repo.findOneBy({ id: Number(req.params.id) });
  res.json(employee);
};

export const createEmployee = async (req: Request, res: Response) => {
  const employee = repo.create(req.body);
  const result = await repo.save(employee);
  res.json(result);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const result = await repo.update(req.params.id, req.body);
  res.json(result);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  await repo.delete(req.params.id);
  res.sendStatus(204);
};
