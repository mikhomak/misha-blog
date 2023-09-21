const queries = {
    allPosts: async (_, __, { dataSources }) => {
        return (await dataSources.prisma.postModel.findMany()).map((postModel) => populatePost(postModel));
    },
    post: async (_, params, { dataSources }) => {
        const PostModel = await dataSources.postModelsDataSource.findPostModelById(params.id);
        return populatePost(PostModel);
    }
};
export function populatePost(postModel) {
    return {
        ...postModel,
        createdAt: postModel.createdAt.toDateString(),
        text: postModel.content,
    };
    ;
}
;
export default queries;
