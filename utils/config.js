import { from } from "./variables.js";

export const config = {
  // where we get the sources from
  from,

  // graph
  graph: {
    templates: {},
    blocks: {},
  },

  layers: ["normalize", "defaults", "components", "utilities", "overrides"],

  // excluded blocks
  notGetBlocks: [],
  // ignored blocks
  ignoredBlocks: ["no-js", "content-filler"],
  // always added blocks
  alwaysAddBlocks: [],
  // virtual blocks list
  blocksFromHtml: [],

  //* FLAGS
  // library
  isLibraryBuild: process.env.BUILD_LIBRARY || false,
  // debugging
  isDebugging: true,
  // todo separates flags config?
};
