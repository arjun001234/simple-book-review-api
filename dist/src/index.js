"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./api/schema");
const server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema
});
server.listen(3000, () => {
    console.log("server is up and running");
});
//# sourceMappingURL=index.js.map