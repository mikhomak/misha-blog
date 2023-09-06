
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    documents: ['src/**/*.tsx'],
    schema: "../server/schema.graphql",
    generates: {
        "./src/__generated__/": {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;
