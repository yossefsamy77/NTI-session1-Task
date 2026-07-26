import { students } from '../data/students.js';
import { calculateAverage } from './calculateAverage.js';

export function listStudents() {
  console.log('\n--- 📋 Student List ---');
  if (students.length === 0) {
    console.log('No students recorded.');
    return;
  }

  students.forEach(student => {
    const avg = calculateAverage(student.grades);
    console.log(`ID: ${student.id} | Name: ${student.name} | Grades: [${student.grades.join(', ')}] | Avg: ${avg}`);
  });
}