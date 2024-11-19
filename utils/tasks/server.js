"use strict";

import browserSync from "browser-sync";

import { config } from "../config.js";

const { serverOptions } = config;

export function server() {
  browserSync.init(serverOptions);
}
