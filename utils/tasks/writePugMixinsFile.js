"use strict";

import fs from "node:fs";

import { config } from "../config.js";
import { doNotEditMsg } from "../variables.js";
import { getDirectories } from "../functions/getDirectories.js";

const { from, isLibraryBuild } = config;

export function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectories(`${from.blocks}/`, "pug");
  let pugMixins = "//-" + doNotEditMsg;
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ${from.blocks.replace(from.root, "..")}/${blockName}/${blockName}.pug\n`;
  });
  // todo
  // if (isLibraryBuild) {
  //   let allLibraryBlocksWithPugFiles = getDirectories(`${from.library}/blocks/`, "pug");
  //   allLibraryBlocksWithPugFiles.forEach(function (blockName) {
  //     pugMixins += `include ${from.library.replace(from.root, "..")}/blocks/${blockName}/${blockName}.pug\n`;
  //   });
  //   let edgingLibraryBlocksWithPugFiles = getDirectories(`${from.library}/edging/`, "pug");
  //   edgingLibraryBlocksWithPugFiles.forEach(function (blockName) {
  //     pugMixins += `include ${from.library.replace(from.root, "..")}/edging/${blockName}/${blockName}.pug\n`;
  //   });
  // }
  fs.writeFileSync(`${from.templates}/mixins.pug`, pugMixins);
  cb?.();
}
