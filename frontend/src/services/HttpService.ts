
  
  const API_BASE = "http://localhost:3000/api/employees"; // Change if needed
  
  export const HttpService = {
    async getAll(): Promise<Employee[]> {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch employees");
      return res.json();
    },
  
    async getById(id: number): Promise<Employee> {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) throw new Error("Employee not found");
      return res.json();
    },
  
    async create(data: Employee): Promise<Employee> {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create employee");
      return res.json();
    },
  
    async update(id: number, data: Employee): Promise<Employee> {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update employee");
      return res.json();
    },
  
    async delete(id: number): Promise<void> {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete employee");
    },
  };
  