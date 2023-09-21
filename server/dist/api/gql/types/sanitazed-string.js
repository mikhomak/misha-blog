import { GraphQLScalarType } from 'graphql';
import xss from 'xss';
export const sanitazedString = new GraphQLScalarType({
    name: 'sanitazedString',
    description: 'Text with sanitization',
    serialize(value) {
        if (typeof value === 'string') {
            return xss(value);
        }
        return value;
    },
    parseValue(value) {
        if (typeof value === 'string') {
            return xss(value);
        }
        console.log('GraphQL Sanitzed string Scalar parser expected a `string`');
        throw new Error('GraphQL Sanitzed string Scalar parser expected a `string`');
    },
    parseLiteral(ast) {
        if (typeof ast === 'string') {
            return xss(ast);
        }
        return null;
    },
});
