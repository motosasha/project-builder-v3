"use strict";

import { series, parallel, task } from "gulp";
import { calcGraph } from "./utils/tasks/calcGraph.js";

import { writePugMixinsFile } from "./utils/tasks/writePugMixinsFile.js";

task("dev:graph", calcGraph);

task("compile:pugMixin", writePugMixinsFile);

task("default", series(parallel("dev:graph"), parallel("compile:pugMixin")));
