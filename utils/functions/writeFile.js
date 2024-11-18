import fs from "node:fs";

/**
 * Writes content to a file named 'readme.md' at the specified path.
 *
 * @param {string} path         - The path to the directory where the file will be created.
 * @param {string} content      - The content to be written to the file.
 * @param {string} [createMsg]  - An optional message to be logged if the file is created.
 * @returns {void}
 */
export function writeFile(path, content, createMsg) {
  fs.writeFile(`${path}`, content, (err) => {
    if (err) {
      return console.log(`[MSG] File NOT created: ${err}`);
    }
    console.log(`[MSG] File created: ${path}`);
    if (createMsg) {
      console.warn(createMsg);
    }
  });
}
