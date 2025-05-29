export type Person = {
  name: string;
  age: number;
};

export function isAdult(person: Person): boolean {
  return person.age >= 18;
}