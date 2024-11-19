"use strict";

import { series, parallel, task } from "gulp";
import { calcGraph } from "./utils/tasks/calcGraph.js";
import { server } from "./utils/tasks/server.js";

import { writePugMixinsFile } from "./utils/tasks/writePugMixinsFile.js";

task("dev:graph", calcGraph);
task("dev:server", server);

task("compile:pugMixin", writePugMixinsFile);

task("default", series(parallel("dev:graph"), parallel("compile:pugMixin")));
