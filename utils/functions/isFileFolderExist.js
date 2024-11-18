"use strict";

import fs from "node:fs";

/**
 * Checking the existence of a file or folder
 *
 * @param {String} filePath - path to file or folder
 * @return {Boolean}          exist or not
 */
export function isFileExist(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
}

/**
 * Checks if a directory exists and creates it if it doesn't.
 *
 * @param {string} path     - The path to the directory to check or create.
 * @returns {Promise<void>}   A Promise that resolves when the directory is created or already exists.
 */
export function isFolderExist(path) {
  if (isFileExist(path) === false) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`[MSG] Directory created: ${path}`);
      }
    });
  } else {
    console.log(`[MSG] Directory NOT created (already exists): ${path}`);
  }
}
