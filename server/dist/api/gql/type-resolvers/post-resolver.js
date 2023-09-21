const postResolver = {
    comments: async (parent, _, { dataSources }) => {
        const post = await dataSources.postModelsDataSource.findPostModelById(parent.id);
        return post.comments.map(commentModel => populateComment(commentModel, parent));
    },
    amountOfComments: async (parent, _, { dataSources }) => {
        return (await dataSources.postModelsDataSource.findPostModelById(parent.id)).comments.length;
    }
};
export function populateComment(commentModel, post) {
    return {
        ...commentModel,
        post: post,
        createdAt: commentModel.createdAt.toString()
    };
}
export default postResolver;
