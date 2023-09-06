import { CommentResolvers,  } from '../../__generated__/resolver-types';


const commentResolver: CommentResolvers = {
    author: (parent) => parent.author,
    date: (parent) => parent.date,
    text: (parent) => parent.text
};

export default commentResolver;