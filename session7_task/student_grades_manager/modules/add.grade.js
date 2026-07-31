import { readGrades } from './read.grades.js';
import { saveGrades } from './save.grades.js';

export function addGrade(name, subject, grade) {
  const grades = readGrades();

  const newRecord = {
    id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
    name,
    subject,
    grade: Number(grade)
  };

  grades.push(newRecord);
  
  if (saveGrades(grades)) {
    console.log(`✅ Added grade record for ${name} (${subject}: ${grade})`);
  }
}