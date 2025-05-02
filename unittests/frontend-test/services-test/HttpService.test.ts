import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpService, Employee } from '../HttpService';

global.fetch = vi.fn();

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice', position: 'Engineer' },
  { id: 2, name: 'Bob', position: 'Manager' }
];

describe('HttpService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch all employees', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmployees,
    });

    const result = await HttpService.getAll();
    expect(result).toEqual(mockEmployees);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/employees');
  });

  it('should create a new employee', async () => {
    const newEmployee: Employee = { name: 'Charlie', position: 'Designer' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...newEmployee, id: 3 }),
    });

    const result = await HttpService.create(newEmployee);
    expect(result).toEqual({ ...newEmployee, id: 3 });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/employees',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newEmployee),
      })
    );
  });

  it('should update an employee', async () => {
    const updatedEmployee: Employee = { name: 'Alice Updated', position: 'Lead' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...updatedEmployee }),
    });

    const result = await HttpService.update(1, updatedEmployee);
    expect(result).toEqual({ id: 1, ...updatedEmployee });
  });

  it('should delete an employee', async () => {
    (fetch as any).mockResolvedValueOnce({ ok: true });

    const result = await HttpService.delete(2);
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/employees/2', expect.objectContaining({ method: 'DELETE' }));
  });
});
