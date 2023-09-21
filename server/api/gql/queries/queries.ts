import { CommentModel, PostModel } from '@prisma/client';
import { Comment, Post, QueryResolvers } from '../../__generated__/resolver-types';

const queries: QueryResolvers = {
    allPosts: async (_, __, { dataSources }) => {
        return (await dataSources.prisma.postModel.findMany()).map((postModel) => populatePost(postModel));
    },

    post: async (_, params, { dataSources }) => {
        const PostModel: PostModel = await dataSources.postModelsDataSource.findPostModelById(params.id);
        return populatePost(PostModel);
    }
};

export function populatePost(postModel: PostModel): Post {
    return {
        ...postModel,
        createdAt: postModel.createdAt.toDateString(),
        text: postModel.content,
    };;
};


export default queries;