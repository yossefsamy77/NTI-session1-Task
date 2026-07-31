import { readGrades } from './read.grades.js';
import { saveGrades } from './save.grades.js';

export function updateGrade(id, newGrade) {
  const grades = readGrades();
  const record = grades.find(item => item.id === id);

  if (!record) {
    console.log(`⚠️ Record with ID ${id} not found.`);
    return;
  }

  record.grade = Number(newGrade);

  if (saveGrades(grades)) {
    console.log(`✏️ Updated grade for ID ${id} (${record.name}) to ${newGrade}`);
  }
}