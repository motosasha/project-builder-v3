"use strict";

import { config } from "../config.js";

import chalk from "chalk";

let {
  graph: { blocks },
  notGetBlocks,
  alwaysAddBlocks,
  isDebugging,
} = config;
config.blocksFromHtml = [...alwaysAddBlocks];

/**
 * Collects block names from a given file and updates a graph data structure.

 * This function iterates through a list of class names, adds them to a block list, and updates a graph data structure. It also checks if the block is already in a specific list and adds it if necessary.

 * @param {Object} file       - An object representing the file being processed.
 * @param {string[]} classes  - An array of class names extracted from the file.
 */
export function graphBlocksCollector(file, classes) {
  const blocksList = [];

  for (let item of classes) {
    blocksList.push(item);

    if (!notGetBlocks.includes(item)) {
      // add a node and connection to the graph
      if (blocks[item]) {
        blocks[item].add(file.path);
      } else {
        blocks[item] = new Set();
        blocks[item].add(file.path);
      }

      // is the block already exist?
      if (config.blocksFromHtml.indexOf(item) + 1) continue;
      // add class to the list
      config.blocksFromHtml.push(item);
    }
  }

  if (isDebugging && blocksList.length) {
    console.log(
      `[  ${chalk.yellow("info")}  ] Used HTML blocks (${blocksList.length}) on ${file.relative}: ${blocksList.join(", ")}`,
    );
  }
}
