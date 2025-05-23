import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Employee } from "shared-models";
import { HttpService as Svc } from "frontend";

beforeEach(() => {
  vi.clearAllMocks();
});

const mocks: Employee[] = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Manager' }
];

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'success' }),
  })
) as any;

describe('Svc', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getAll', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mocks),
    });

    const r = await Svc.getAll();
    expect(r).toEqual(mocks);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/employees');
  });

  it('create', async () => {
    const e: Employee = { id: 1, name: 'Charlie', role: 'Designer' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...e, id: 3 }),
    });

    const r = await Svc.create(e);
    expect(r).toEqual({ ...e, id: 3 });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e),
      })
    );
  });

  it('update', async () => {
    const e: Employee = { id: 1, name: 'Alice Updated', role: 'Lead' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...e }),
    });

    const r = await Svc.update(1, e);
    expect(r).toEqual({ ...e });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees/update/1',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e),
      })
    );
  });

  it('delete', async () => {
    (fetch as any).mockResolvedValueOnce({ ok: true });

    await Svc.delete(2);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees/2',
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
