import { students } from '../data/students.js';
import { calculateAverage } from './calculateAverage.js';

export function filterPassed(passingGrade = 60) {
  return students.filter(student => calculateAverage(student.grades) >= passingGrade);
}