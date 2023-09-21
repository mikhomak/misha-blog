import xss from 'xss';
import { MutationResolvers } from '../../__generated__/resolver-types';
import { populatePost } from '../queries/queries';
import { populateComment } from '../type-resolvers/post-resolver';

const mutationResolvers: MutationResolvers = {
    addComment: async (_, args, { dataSources }) => {
        const commentInput = args.commentInput;

        const data = {
            text: xss((args.commentInput.text as string).substring(0, 500)),
            author: xss((args.commentInput.author as string).substring(0, 50)),
            postId: xss((args.commentInput.postId as string).substring(0, 50)),
        }

        const comment = await dataSources.prisma.commentModel.create(
            {
                data,
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
    },


    like: async (_, args, { dataSources }) => {

        const postModel = await dataSources.postModelsDataSource.findPostModelById(args.postId);
        const updatedAmountOfLikes = postModel.amountOfLikes + 1;
        console.log(`post - ${args.postId} with likes ${updatedAmountOfLikes}`)
        await dataSources.prisma.postModel.update({
            where: { id: args.postId },
            data: { amountOfLikes: { increment: 1 } }
        })

        return { likes: updatedAmountOfLikes };
    }
};

export default mutationResolvers;