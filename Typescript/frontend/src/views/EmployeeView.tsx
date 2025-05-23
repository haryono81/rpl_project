import React, { useEffect, useState } from "react";
import { HttpService } from "../services/HttpService";
import { Employee } from "shared-models";

export const EmployeeView: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({ id: 0, name: "", role: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await HttpService.getAll();
    setEmployees(data);
  };

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
    resetForm();
    loadEmployees();
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditingId(emp.id ?? null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await HttpService.delete(id);
      loadEmployees();
    }
  };

  const resetForm = () => {
    setForm({ id: 0, name: "", role: "" });
  };

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 600,  // Maximum width for the container
        margin: "0 auto",  // Horizontally center the container
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Employee Manager</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 10,
          marginBottom: 30,
          padding: 20,
          border: "1px solid #444",
          borderRadius: 8,
          backgroundColor: "#2c2c2c",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            padding: 8,
            borderRadius: 4,
            border: "1px solid #555",
            backgroundColor: "#444",
            color: "#fff",
          }}
        />
        <input
          type="text"
          name="role"
          placeholder="Employee Role"
          value={form.role}
          onChange={handleChange}
          required
          style={{
            padding: 8,
            borderRadius: 4,
            border: "1px solid #555",
            backgroundColor: "#444",
            color: "#fff",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={{ padding: "8px 16px" }}>
            {editingId === null ? "Create Employee" : "Update Employee"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              style={{ padding: "8px 16px", marginLeft: 10 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 style={{ textAlign: "center" }}>Employee List</h3>
        {employees.length === 0 ? (
          <p style={{ textAlign: "center" }}>No employees found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {employees.map((emp) => (
              <li
                key={emp.id}
                style={{
                  padding: 10,
                  marginBottom: 10,
                  border: "1px solid #555",
                  borderRadius: 6,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#333",
                }}
              >
                <div>
                  <strong>{emp.name}</strong> — <em>{emp.role}</em>
                </div>
                <div>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: 10 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(emp.id!)} style={{ color: "red" }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
