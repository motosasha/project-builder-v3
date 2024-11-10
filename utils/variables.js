const prefix = "temp/structure/"; // ""

export const from = {
  root: "src",
  get pages() {
    return `${this.root}/${prefix}pages`;
  },
  get templates() {
    return `${this.root}/${prefix}templates`;
  },
  get blocks() {
    return `${this.root}/${prefix}blocks`;
  },
};

export const pugContent = (blockName) => `//- All mixins in this file must be scoped to the block name (${blockName})
//- Class selectors must be scoped to the block name for inclusion in the build

mixin ${blockName}(mods)

  //- Takes:
  //-   mods    {string} - a comma-separated list of modifiers
  //- Usage:
        +${blockName}("some-mod")

  //- Modifiers list
  -
    var allMods = "";
    if (typeof (mods) !== "undefined" && mods) {
      var modsList = mods.split(",");
      for (var i = 0; i < modsList.length; i++) {
        allMods = allMods + " ${blockName}--" + modsList[i].trim();
      }
    }

  .${blockName}(class=allMods)&attributes(attributes)
    .${blockName}__inner
      block
`;

export const scssContent = (blockName) => `@use "src/scss/breakpoints";
@use "src/scss/mixins/text-styles";

.${blockName} {
  $block-name: &; // #{$block-name}__element
}`;

export const jsContent = (blockName) => `import { ready } from "../../js/utils/documentReady.js";

ready(function () {
  console.log("${blockName} script is working");
});
`;
