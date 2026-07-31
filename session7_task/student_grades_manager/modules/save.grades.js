import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/grades.json');

export function saveGrades(grades) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(grades, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('❌ Error saving to grades.json:', error.message);
    return false;
  }
}