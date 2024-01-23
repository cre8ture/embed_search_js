import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get all test files
const testFiles = fs.readdirSync(__dirname).filter(file => file.startsWith('test') && file.endsWith('.js'));

console.log("me test files are", testFiles);

// Require and run all test files
for (const file of testFiles) {
  import(pathToFileURL(path.join(__dirname, file)).href);
}