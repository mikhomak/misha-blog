import { CommentModel } from '@prisma/client';
import { Comment, Post, PostResolvers } from '../../__generated__/resolver-types';

const postResolver: PostResolvers = {
    comments: async (parent, _, { dataSources }) => {
        const post = await dataSources.postModelsDataSource.findPostModelById(parent.id);
        return post.comments.map(commentModel => populateComment(commentModel, parent));
    },

    amountOfComments: async (parent, _, { dataSources }) => {
        return (await dataSources.postModelsDataSource.findPostModelById(parent.id)).comments.length;
    }
};


export function populateComment(commentModel: CommentModel, post: Post): Comment {
    return {
        ...commentModel,
        post: post,
        createdAt: commentModel.createdAt.toString()
    }
}

export default postResolver;