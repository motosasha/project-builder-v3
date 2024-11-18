"use strict";

import { src } from "gulp";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import through2 from "through2";
import chalk from "chalk";

import { config } from "../config.js";
import { makeGraph } from "../functions/makeGraph.js";

const { from, graph, blocksFromHtml, isDebugging } = config;

export function calcGraph() {
  // todo check this reset
  // blocksFromHtml = [];

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
      if (isDebugging) console.log(chalk.bgYellow("[grphAftr]"), graph);
      console.log(blocksFromHtml);
    })
    .pipe(plumber.stop());
}
