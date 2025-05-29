export async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: 'Chandan' }), 300)
  );
}