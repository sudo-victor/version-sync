"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/strategy/ai/strategies/chat-gpt-strategy.ts
var chat_gpt_strategy_exports = {};
__export(chat_gpt_strategy_exports, {
  ChatGPTStrategy: () => ChatGPTStrategy
});
module.exports = __toCommonJS(chat_gpt_strategy_exports);
var import_openai = __toESM(require("openai"));
var ChatGPTStrategy = class {
  constructor() {
    this.openai = new import_openai.default();
  }
  formatReleaseDescription(diffOutput) {
    return __async(this, null, function* () {
      var _a;
      const prompt = `
    Por favor, transforme a sa\xEDda do comando 'git diff' em um changelog formatado em Markdown. Analise as mudan\xE7as no c\xF3digo para identificar adi\xE7\xF5es, remo\xE7\xF5es e modifica\xE7\xF5es significativas. Ignore mudan\xE7as triviais como remo\xE7\xE3o de coment\xE1rios ou altera\xE7\xE3o de aspas simples para duplas. Adicionalmente, apenas mencione a inclus\xE3o de novas bibliotecas se elas forem efetivamente utilizadas no c\xF3digo. O changelog deve ser claro, conciso e \xFAtil para os desenvolvedores acompanharem as atualiza\xE7\xF5es do projeto. Responda em portugu\xEAs.

    Sa\xEDda do Git Diff:
    ${diffOutput}
    `;
      const response = yield this.openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [{ role: "user", content: prompt }]
      });
      return (_a = response.choices[0].message.content) != null ? _a : "";
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatGPTStrategy
});
