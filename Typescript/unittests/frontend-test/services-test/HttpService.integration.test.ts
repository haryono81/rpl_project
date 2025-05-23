import { describe, it, expect } from 'vitest';
import { HttpService } from 'frontend';
import { Employee } from 'shared-models';

describe('HttpServiceReal', () => {
  let created: Employee;

  it('getAll', async () => {
    const result = await HttpService.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('create', async () => {
    const newEmp: Employee = {
      id: 0,
      name: `Test-${Date.now()}`,
      role: 'Tester',
    };
    const result = await HttpService.create(newEmp);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newEmp.name);
    created = result;
  });

  it('getById', async () => {
    const fetched = await HttpService.getById(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.name).toBe(created.name);
  });

  it('update', async () => {
    const updated = { ...created, role: 'QA' };
    const result = await HttpService.update(updated.id, updated);
    expect(result.role).toBe('QA');
  });

  it('delete', async () => {
    await HttpService.delete(created.id);
    let err: any;
    try {
      await HttpService.getById(created.id);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toMatch(/not found/i);
  });
});
