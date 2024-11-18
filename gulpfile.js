"use strict";

import { task } from "gulp";
import { calcGraph } from "./utils/tasks/calcGraph.js";

task("dev:graph", calcGraph);
