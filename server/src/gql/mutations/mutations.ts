import { MutationResolvers } from '../../__generated__/resolver-types';
import { populatePost } from '../queries/queries';
import { populateComment } from '../type-resolvers/post-resolver';


const mutationResolvers: MutationResolvers = {
    addComment: async (_, args, { dataSources }) => {
        const commentInput = args.commentInput;

        const comment = await dataSources.prisma.commentModel.create(
            {
                data:
                {
                    ...commentInput,
                },
                include:
                {
                    Post:
                    {
                        include: { comments: true }
                    }
                }
            });

        console.log(`Post created! At post ${comment.Post.title} with id - ${comment.id} and author ${comment.author} `);

        const post = populatePost(comment.Post);

        return {
            comments:
                comment.Post.comments.map(commentModel => populateComment(commentModel, post))
        };
    }
};

export default mutationResolvers;