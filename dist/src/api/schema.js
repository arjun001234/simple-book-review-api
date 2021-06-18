"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const nexus_1 = require("nexus");
const path_1 = require("path");
exports.schema = nexus_1.makeSchema({
    types: [],
    outputs: {
        typegen: path_1.join(__dirname, '/types', 'nexus-typegen.ts'),
        schema: path_1.join(__dirname, '/types', 'schema.graphql'),
    },
});
//# sourceMappingURL=schema.js.map