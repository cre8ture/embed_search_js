import browserEnv from 'browser-env';
import assert from 'assert';
import { processDocument } from '../loaders/processFiles.js';
import fs from 'fs';
// import { Blob } from 'blob';
import pkg from 'blob';
const { Blob } = pkg;
import { File } from 'fetch-blob/from.js';
// Set up a mock browser environment
browserEnv();

// Test handleFiles function
const testProcessDocument = async () => {
  console.log("me handleFiles is", processDocument);
  // Create a mock text file
  // const textFile = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' });

  // // Call handleFiles with the mock file
  // const result = await processDocument(textFile);

  // Convert the File to a Blob
// const blob = new Blob([await textFile.arrayBuffer()], { type: textFile.type });

const text = "Hello, world!"

// Call handleFiles with the Blob
const result = await processDocument(text);

console.log("me result is", result);
  // Check that the result is as expected
  assert.strictEqual(result[0], 'Hello, world!', 'handleFiles did not process the file correctly');
};


// Run the test
testProcessDocument().catch(error => {
  console.error('Test failed:', error);
});


const testProcessDocumentDocx = async () => {
  console.log("testing the docx file");

  // Read the .docx file into a Buffer
  const buffer = fs.readFileSync('./tests/sample.docx');

  // Convert the Buffer to a Blob
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  // Create a File object with the Blob
  const file = new File([blob], '/tests/sample_blob.docx');

  // Call processDocument with the File
  const result = await processDocument(file);

  // Check the result
  // Replace 'expectedResult' with the actual result you expect
  assert.deepStrictEqual(result, expectedResult);
};

testProcessDocumentDocx().catch(console.error);