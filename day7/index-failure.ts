import { readFileSync } from "fs";
import * as path from "path";

const fileSystem: any = {};
let total = 0;

export const getTotalFileSize = () => {
  const data: any[] = parseCommandDataToString();
  const dirHistory: any[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].indexOf("$ cd") !== -1) {
      if (data[i].indexOf("$ cd ..") !== -1) {
        dirHistory.pop();
      } else {
        dirHistory.push(data[i].split(" ")[2]);
      }
    } else if (data[i].indexOf("dir") !== -1) {
      const parentDir = dirHistory[dirHistory.length - 1];
      const childDir = data[i].split(" ")[1];

      if (!fileSystem[parentDir]) {
        fileSystem[parentDir] = { size: 0 };
      }
      if (!fileSystem[parentDir][childDir]) {
        fileSystem[parentDir][childDir] = { size: 0 };
      }
    } else if (
      data[i].indexOf("dir") === -1 &&
      data[i].indexOf("$ cd") === -1 &&
      data[i].indexOf("$ ls") === -1
    ) {
      const currentDir = dirHistory[dirHistory.length - 1];
      const fileSize = parseInt(data[i].split(" ")[0]);

      if (!fileSystem[currentDir]) {
        fileSystem[currentDir] = { size: 0 };
      }

      fileSystem[currentDir].size += fileSize;
    }
  }

  recurse("/");
  iterate(fileSystem["/"]);
  console.log(fileSystem);
  return total;
};

/** utils */
const recurse = (parent = "/") => {
  for (const prop in fileSystem[parent]) {
    for (const matchProp in fileSystem) {
      if (fileSystem.length === 1) {
        break;
      }
      if (prop === matchProp) {
        fileSystem[parent][matchProp] = fileSystem[matchProp];
        delete fileSystem[matchProp];
        recurse(matchProp);
      }
    }
  }
};

const iterate = (obj: typeof fileSystem) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key].size && obj[key].size < 100000) {
      total += obj[key].size;
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterate(obj[key]);
    }
  });

  return total;
};

export const parseCommandDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

console.log("total file size", getTotalFileSize());
