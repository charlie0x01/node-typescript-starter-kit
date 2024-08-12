// test.ts

import fs from 'fs';
import path from 'path';

const unusedVariable = 'I am not used anywhere';

interface User {
  name: string;
  age: number;
}

// Example of an unused function argument (should trigger no-unused-vars)
function greet(user: User, _unusedArg: string): void {
  console.log(`Hello, ${user.name}!`);
}

// Example of promise handling (should be checked by eslint-plugin-promise)
async function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

// Example of security issue (should be checked by eslint-plugin-security)
const filePath = process.argv[2];
fs.readFileSync(filePath);

// Example of incorrect import order (should trigger import/order)
import express from 'express';

import { User } from './models/User';

// Example of code that is not formatted according to Prettier rules
function sayGoodbye(name: string) {
  console.log('Goodbye, ' + name + '!');
}

// Example of using unsupported ES syntax (optional chaining should be supported)
const user: User = { name: 'John', age: 30 };
const userAge = user?.age;

console.log(userAge);
