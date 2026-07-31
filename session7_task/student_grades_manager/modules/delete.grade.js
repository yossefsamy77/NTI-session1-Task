import { readGrades } from './read.grades.js';
import { saveGrades } from './save.grades.js';

export function deleteGrade(id) {
  let grades = readGrades();
  const index = grades.findIndex(item => item.id === id);

  if (index === -1) {
    console.log(`⚠️ Record with ID ${id} not found.`);
    return;
  }

  const [deleted] = grades.splice(index, 1);

  if (saveGrades(grades)) {
    console.log(`🗑️ Deleted record for ${deleted.name} (ID: ${id})`);
  }
}