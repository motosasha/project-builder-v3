"use strict";

import { config } from "../config.js";
import { regExps } from "../variables.js";

/**
 * Add templates to graph
 * @param  {Object} file file buffer
 * @param  {String} fileContent file content string
 */
export function graphTemplatesCollector(file, fileContent) {
  const templateExtendLine = fileContent.match(regExps.templateRegexp);
  let templateFileName;

  if (templateExtendLine) {
    templateFileName = templateExtendLine.toString();
    if (config.graph.templates[templateFileName]) {
      config.graph.templates[templateFileName].add(file.path);
    } else {
      config.graph.templates[templateFileName] = new Set();
      config.graph.templates[templateFileName].add(file.path);
    }
  }
}
