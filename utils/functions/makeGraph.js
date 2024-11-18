"use strict";

import { config } from "../config.js";
import { classCollector } from "./classCollector.js";
import { graphBlocksCollector } from "./graphBlocksCollector.js";
import { graphTemplatesCollector } from "./graphTemplatesCollector.js";

const { from, notGetBlocks } = config;

/**
 * Processes a file, extracts class names and template dependencies, and updates the graph data structure.

 * This function analyzes the given file, extracts class names, and identifies template inheritance relationships. It then updates the graph data structure to track these dependencies.

 * @param {Object} file - The file object being processed.
 * @param {string} enc  - The encoding of the file.
 * @param {Function} cb - A callback function to be invoked after processing the file.
 */
export function makeGraph(file, enc, cb) {
  if (file === null) {
    cb(null, file);
  }

  // Checking whether the file being processed is an exception
  let processThisFile = true;
  let fileContent;

  notGetBlocks.forEach(function (excludedBlock) {
    if (file.stem.trim() === excludedBlock.trim()) processThisFile = false;
  });

  // The file is not excluded from processing, let's go...
  if (processThisFile) {
    fileContent = file.contents.toString();
    const fileClasses = classCollector(file, fileContent);

    // Traversing the found classes and adding the class to the graph
    graphBlocksCollector(file, fileClasses);

    // Add templates to graph
    if (file.path.includes(`${from.pages}`)) {
      graphTemplatesCollector(file, fileContent);
    }
  }
  cb();
}
