"use strict";

import { src } from "gulp";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import through2 from "through2";
import chalk from "chalk";

import { config } from "../config.js";
import { classCollector } from "../functions/classCollector.js";
import { graphBlocksCollector } from "../functions/graphBlocksCollector.js";
import { graphTemplatesCollector } from "../functions/graphTemplatesCollector.js";

const { from, graph, isDebugging } = config;

export function calcGraph() {
  // todo check this reset
  // config.blocksFromHtml = [];

  if (isDebugging) {
    if (Object.keys(graph.blocks).length && Object.keys(graph.templates)) {
      console.log(chalk.bgYellow("[grphBfre]"), graph);
    } else console.log(chalk.bgYellow("[grphEmpt]"), "Graph is empty");
  }

  const pagesList = [
    `${from.pages}/**/*.pug`,
    `${from.blocks}/**/*.pug`,
    `${from.templates}/**/*.pug`,
    `!${from.templates}/mixins.pug`,
  ];

  return src(pagesList) // todo , { since: lastRun(calcGraph) }
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Graph calculating",
            message: err.message,
          };
        }),
      }),
    )
    .pipe(through2({ objectMode: true, allowHalfOpen: false }, makeGraph))
    .on("end", () => {
      if (config.isDebugging) console.log(chalk.bgYellow("[grphAftr]"), graph);
      console.log(config.blocksFromHtml);
    })
    .pipe(plumber.stop());
}

function makeGraph(file, enc, cb) {
  if (file === null) {
    cb(null, file);
  }

  // Checking whether the file being processed is an exception
  let processThisFile = true;
  let fileContent;

  config.notGetBlocks.forEach(function (excludedBlock) {
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
