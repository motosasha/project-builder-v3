"use strict";

import { from, pugContent, scssContent, jsContent } from "./utils/variables.js";
import { isFileExists, isFolderExist } from "./utils/functions/isFileFolderExist.js";
import { writeFile } from "./utils/functions/writeFile.js";
import { uniqueArray } from "./utils/functions/uniqueArray.js";

/**
 * Generates files for a new block.
 *
 * **Usage:**
 * `node addBlock.js [block name] [add. space-separated expansions ([scss] pug js md img assets symbols)]`
 *
 * **Example:**
 * `node addBlock.js new-block scss pug js`
 */

const defaultExtensions = ["scss"];

if (process.argv.length < 3) {
  console.error("[MSG] Operation failed: block name is undefined");
  process.exit(1);
} else {
  const blockName = process.argv[2];
  const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));
  const dirPath = `${from.blocks}/${blockName}/`;

  isFolderExist(dirPath);

  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`;
    let fileContent = "";
    let fileCreateMsg = "";

    switch (extension) {
      case "pug":
        fileContent = pugContent(blockName);
        break;
      case "scss":
        fileContent = scssContent(blockName);
        break;
      case "js":
        fileContent = jsContent(blockName);
        break;
      case "md":
        fileContent = "";
        break;
      case "img":
        const imgFolder = `${dirPath}img/`;
        isFolderExist(imgFolder);
        break;
      case "assets":
        const assetsFolder = `${dirPath}assets/`;
        isFolderExist(assetsFolder);
        break;
      case "symbols":
        const symbolsFolder = `${dirPath}symbols/`;
        isFolderExist(symbolsFolder);
        break;
    }

    if (isFileExists(filePath) === false && extension !== "img" && extension !== "assets" && extension !== "symbols") {
      writeFile(filePath, fileContent, fileCreateMsg);
    } else if (extension !== "img" && extension !== "assets" && extension !== "symbols") {
      console.log(`[MSG] File NOT created (already exists): ${filePath}`);
    } else if (extension === "md") {
      writeFile(`${dirPath}readme.md`, fileContent, fileCreateMsg);
    }
  });
}
