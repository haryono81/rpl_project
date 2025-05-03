import { Employee } from "shared-models";

const API_BASE = "http://localhost:3000/employees"; // adjust as needed

export class HttpService {
  public static  async getAll(): Promise<Employee[]> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  }

  public static  async getById(id: number): Promise<Employee> {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Employee not found");
    return res.json();
  }

  public static  async create(data: Employee): Promise<Employee> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
  }

  public static  async update(id: number, data: Employee): Promise<Employee> {

    let json = JSON.stringify(data)
    const res = await fetch(`${API_BASE}/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    });
    
    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
  }

  

  public static  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete employee");
  }
}
