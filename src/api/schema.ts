import { makeSchema } from 'nexus'
import { join } from 'path';
import * as types from './graphql/index';

export const schema = makeSchema({
  types, 
  outputs: {
    typegen: join(__dirname, '/types', 'nexus-typegen.ts'), 
    schema: join(__dirname, '/types', 'schema.graphql'), 
  },
  contextType: {
    module: join(__dirname,'./graphql/context.ts'),
    export: "Context"
  }
})
