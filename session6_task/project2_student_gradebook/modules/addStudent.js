import { students } from '../data/students.js';

export function addStudent(id, name, grades = []) {
  const existingStudent = students.find(s => s.id === id);

  if (existingStudent) {
    console.log(`⚠️ Student with ID ${id} already exists.`);
    return;
  }

  students.push({ id, name, grades });
  console.log(`✅ Added student: ${name}`);
}