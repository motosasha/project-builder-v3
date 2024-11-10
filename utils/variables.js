const prefix = "shadow/structure/"; // ""

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

export const pugContent = (blockName) => `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})
//- Упоминание имени блока в классах обязательно, без этого он не попадёт
//- в сборку

mixin ${blockName}(mods)

  //- Принимает:
  //-   mods    {string} - список модификаторов
  //- Вызов:
        +${blockName}("some-mod")

  //- список модификаторов
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
