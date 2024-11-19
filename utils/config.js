import { from, to } from "./variables.js";

export const config = {
  // where we get the sources from
  from,
  // where we put the built project
  to,

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

  // browserSync options
  serverOptions: {
    server: to.root,
    host: "192.168.1.39",
    logPrefix: "dev-serv",
    port: 3000,
    startPath: "index.html",
    open: false,
    notify: true,
    reloadDebounce: 1000,
    reloadOnRestart: true,
    // callbacks: {
    //   ready() {
    //     console.log(`---------- -----------------------------------------------------`);
    //   },
    // },
  },

  //* FLAGS
  // library
  isLibraryBuild: process.env.BUILD_LIBRARY || false,
  // debugging
  isDebugging: true,
  // todo separates flags config?
};
