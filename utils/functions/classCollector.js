"use strict";

import path from "node:path";

import { config } from "../config.js";
import { regExps } from "../variables.js";
import { isFileExist } from "./isFileFolderExist.js";

/**
 * Collecting class names from file contents
 * @param  {Object} file file buffer
 * @param  {String} fileContent file content string
 * @return {Object}      an array with classnames
 */
export function classCollector(file, fileContent) {
  const classCollection = new Set();
  let extractedClass;

  while (true) {
    extractedClass = regExps.classRegexp.exec(fileContent);

    if (!extractedClass) break;

    // add block names
    if (extractedClass[0].includes("+") || extractedClass[0].includes(".")) {
      extractedClass[0] = extractedClass[0].slice(1);
    }

    // add classes in class attribute
    if (extractedClass[0].includes('class="') || extractedClass[0].includes("class='")) {
      extractedClass[0] = extractedClass[0].slice(7, -1);
    }
    if (extractedClass[0].includes("class= ") || extractedClass[0].includes("class=")) continue;

    // if includes space
    if (extractedClass[0].includes(" ")) {
      extractedClass[0].split(" ").forEach((element) => {
        if (
          !element.includes("__") &&
          !element.includes("--") &&
          !element.includes("js-") &&
          isFileExist(`${config.from.blocks}/${extractedClass[0]}`)
        )
          classCollection.add(element);
      });
    }

    // removing elements and modifiers
    if (extractedClass[0].indexOf("__") > -1 || extractedClass[0].indexOf("--") > -1) continue;

    // remove js utility classes
    if (extractedClass[0].includes("js-")) continue;

    // remove if it matches the exception class from the settings
    if (config.ignoredBlocks.indexOf(extractedClass[0]) + 1) continue;

    // remove if there is no physical representation of the block
    if (!isFileExist(`${config.from.blocks}/${extractedClass[0]}`)) continue;

    // remove the use of the block itself
    if (file && extractedClass[0] === path.parse(`${file.basename}`).name && file.path.includes(config.from.blocks))
      continue;

    classCollection.add(extractedClass[0]);
  }

  return classCollection;
}
