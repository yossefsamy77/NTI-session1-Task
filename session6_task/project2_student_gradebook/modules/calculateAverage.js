export function calculateAverage(grades) {
  if (!grades || grades.length === 0) return 0;
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return Number((sum / grades.length).toFixed(2));
}