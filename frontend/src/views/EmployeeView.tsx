import React, { useEffect, useState } from "react";
import { HttpService } from "../services/HttpService";

export const EmployeeView: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({ name: "", position: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    const data = await HttpService.getAll();
    setEmployees(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      await HttpService.create(form);
    } else {
      await HttpService.update(editingId, form);
      setEditingId(null);
    }
    setForm({ name: "", position: "" });
    load();
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditingId(emp.id ?? null);
  };

  const handleDelete = async (id: number) => {
    await HttpService.delete(id);
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Manager</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId === null ? "Add" : "Update"}</button>
      </form>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.position}{" "}
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
