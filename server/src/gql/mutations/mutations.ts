import { CommentInput, MutationResolvers } from '../../__generated__/resolver-types';
import { COMMENT_EXAMPLE, POST_EXAMPLE } from '../../mock_data';


const mutationResolvers: MutationResolvers = {
    addComment: async (_, args) => {
        const commentInput = args.commentInput;

        console.log(`Post created! ${JSON.stringify(commentInput)}`);

        return [COMMENT_EXAMPLE, COMMENT_EXAMPLE, {
            id: "123",
            author: commentInput.author,
            date: commentInput.date,
            text: commentInput.text,
            post: POST_EXAMPLE,
        }]
    }
};

export default mutationResolvers;