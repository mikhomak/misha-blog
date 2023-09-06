import { PostResolvers } from '../../__generated__/resolver-types';

const postResolver: PostResolvers = {
    amountOfLikes : (parent) => parent.amountOfLikes,
    title : (parent) => parent.title,
    text : (parent) => parent.text,
    date : (parent) => parent.date,
};

export default postResolver;