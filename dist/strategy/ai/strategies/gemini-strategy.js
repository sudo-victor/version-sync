"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/strategy/ai/strategies/gemini-strategy.ts
var gemini_strategy_exports = {};
__export(gemini_strategy_exports, {
  GeminiStrategy: () => GeminiStrategy
});
module.exports = __toCommonJS(gemini_strategy_exports);
var import_generative_ai = require("@google/generative-ai");
var GeminiStrategy = class {
  constructor() {
    const geminiai = new import_generative_ai.GoogleGenerativeAI(process.env.GEMINI_KEY);
    this.model = geminiai.getGenerativeModel({ model: "gemini-1.0-pro" });
  }
  formatReleaseDescription(diffOutput) {
    return __async(this, null, function* () {
      const prompt = `
    Por favor, transforme a sa\xEDda do comando 'git diff' em um changelog formatado em Markdown. Analise as mudan\xE7as no c\xF3digo para identificar adi\xE7\xF5es, remo\xE7\xF5es e modifica\xE7\xF5es significativas. Ignore mudan\xE7as triviais como remo\xE7\xE3o de coment\xE1rios ou altera\xE7\xE3o de aspas simples para duplas. Adicionalmente, apenas mencione a inclus\xE3o de novas bibliotecas se elas forem efetivamente utilizadas no c\xF3digo. O changelog deve ser claro, conciso e \xFAtil para os desenvolvedores acompanharem as atualiza\xE7\xF5es do projeto. Responda em portugu\xEAs.

    Sa\xEDda do Git Diff:
    ${diffOutput}
    `;
      const result = yield this.model.generateContent([prompt]);
      const response = result.response.text();
      return response;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GeminiStrategy
});
