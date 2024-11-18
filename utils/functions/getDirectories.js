"use strict";

import fs from "node:fs";
import path from "path";

import { isFileExist } from "./isFileFolderExist.js";

/**
 * Recursively finds directories containing a specific file with a given extension.
 *
 * This function searches a given directory and its subdirectories for directories that contain a file with the specified extension. The file name is assumed to be the same as the directory name.
 *
 * @param {string} source - The root directory to search.
 * @param {string} ext    - The file extension to look for.
 * @returns {string[]}      An array of directory paths that contain the specified file.
 */
export function getDirectories(source, ext) {
  return fs
    .readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => isFileExist(source + item + "/" + item + "." + ext));
}

/**
 * Recursively searches a directory and its subdirectories for files with a specific extension.

 * This function traverses the specified directory and its subdirectories, looking for files that match the given extension. It returns an array of file paths that meet the criteria.

 * @param {string} source - The root directory to search.
 * @param {string} ext    - The file extension to search for (e.g., '.js', '.txt').
 * @returns {string[]}      An array of file paths that match the specified extension.
 */
export function getDeepDirectories(source, ext) {
  const result = [];
  function getFilesWithExt(source, ext) {
    if (!fs.existsSync(source)) return;

    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const filename = path.join(source, file);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        getFilesWithExt(filename, ext);
      } else if (filename.endsWith(ext)) {
        result.push(filename);
      }
    });
  }
  getFilesWithExt(source, ext);
  return result;
}
