import { addStudent } from './modules/addStudent.js';
import { listStudents } from './modules/listStudents.js';
import { filterPassed } from './modules/filterPassed.js';
import { calculateAverage } from './modules/calculateAverage.js';

console.log("=== PROJECT 2: STUDENT GRADEBOOK ===");

// 1. إضافة الطلاب مع درجاتهم
addStudent(1, 'Alice', [85, 90, 92]);
addStudent(2, 'Bob', [55, 60, 58]);
addStudent(3, 'Charlie', [70, 65, 80]);
addStudent(4, 'Diana', [40, 50, 45]);

// 2. عرض كل الطلاب بالمتوسطات
listStudents();

// 3. فلترة الناجحين (اللي جابوا 60 أو أكتر)
const passedStudents = filterPassed(60);
console.log('\n--- 🎉 Passed Students (Average >= 60) ---');
passedStudents.forEach(student => {
  const avg = calculateAverage(student.grades);
  console.log(`- ${student.name} (Average: ${avg})`);
});