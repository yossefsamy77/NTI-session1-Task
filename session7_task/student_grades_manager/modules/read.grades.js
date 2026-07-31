import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/grades.json');

export function readGrades() {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('❌ Error reading grades.json:', error.message);
    return [];
  }
}

export function displayAllGrades() {
  const grades = readGrades();
  console.log('\n--- 📋 Student Grades List ---');
  if (grades.length === 0) {
    console.log('No grade records found.');
    return;
  }
  grades.forEach(item => {
    console.log(`ID: ${item.id} | Student: ${item.name} | Subject: ${item.subject} | Grade: ${item.grade}`);
  });
}