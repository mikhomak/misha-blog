import { CommentResolvers, } from '../../__generated__/resolver-types';


const commentResolver: CommentResolvers = {
    author: (parent) => parent.author,
    createdAt: (parent) => parent.createdAt,
    text: (parent) => parent.text
};

export default commentResolver;