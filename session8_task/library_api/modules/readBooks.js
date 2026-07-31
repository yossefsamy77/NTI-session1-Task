import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/books.json');

export function readBooks() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    throw new Error('Failed to read database file: ' + error.message);
  }
}