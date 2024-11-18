"use strict";

import { config } from "../config.js";
import { regExps } from "../variables.js";

const {
  graph: { templates },
} = config;

/**
 * Collects template file dependencies.

 * This function parses the content of a file to identify template inheritance relationships. It updates a graph data structure to track which files extend which templates.

 * @param {Object} file         - The file object containing information about the file being processed.
 * @param {string} fileContent  - The content of the file.
 */
export function graphTemplatesCollector(file, fileContent) {
  const templateExtendLine = fileContent.match(regExps.templateRegexp);
  let templateFileName;

  if (templateExtendLine) {
    templateFileName = templateExtendLine.toString();
    if (templates[templateFileName]) {
      templates[templateFileName].add(file.path);
    } else {
      templates[templateFileName] = new Set();
      templates[templateFileName].add(file.path);
    }
  }
}
