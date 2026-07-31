import { addGrade } from './modules/add.grade.js';
import { displayAllGrades } from './modules/read.grades.js';
import { updateGrade } from './modules/update.grade.js';
import { deleteGrade } from './modules/delete.grade.js';

console.log("=== TASK 7: STUDENT GRADES MANAGER ===");


addGrade('Youssef', 'JavaScript', 95);
addGrade('Ahmed', 'HTML/CSS', 88);
addGrade('Sara', 'Node.js', 78);


displayAllGrades();

updateGrade(2, 92);

deleteGrade(3);


displayAllGrades();