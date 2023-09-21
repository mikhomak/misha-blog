const config = {
    overwrite: true,
    schema: "./schema.graphql",
    generates: {
        "./api/__generated__/resolver-types.ts": {
            plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"],
            config: {
                contextType: '../index#MishaBlogServerContext'
            }
        }
    },
};
export default config;
