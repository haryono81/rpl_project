import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Employee } from "shared-models";
import { HttpService } from "frontend";

beforeEach(() => {
  vi.clearAllMocks();
});

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Manager' }
];

// Mocking the global fetch function
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'success' }),
  })
) as any;

describe('HttpService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch all employees', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEmployees), // Corrected here
    });

    const result = await HttpService.getAll();
    expect(result).toEqual(mockEmployees);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/employees');
  });

  it('should create a new employee', async () => {
    const newEmployee: Employee = { id: 1, name: 'Charlie', role: 'Designer' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...newEmployee, id: 3 }), // Return mock employee with id
    });

    const result = await HttpService.create(newEmployee);
    expect(result).toEqual({ ...newEmployee, id: 3 });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/employees',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee), // Ensure body is correct
      })
    );
  });

  it('should update an employee', async () => {
    const updatedEmployee: Employee = { id: 1, name: 'Alice Updated', role: 'Lead' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...updatedEmployee }),
    });

    const result = await HttpService.update(1, updatedEmployee);
    expect(result).toEqual({ ...updatedEmployee });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/employees/1',
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee), // Ensure body is correct
      })
    );
  });

  it('should delete an employee', async () => {
    (fetch as any).mockResolvedValueOnce({ ok: true });

    const result = await HttpService.delete(2);
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/employees/2', expect.objectContaining({ method: 'DELETE' }));
  });
});
