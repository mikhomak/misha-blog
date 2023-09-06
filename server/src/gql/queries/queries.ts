import { QueryResolvers } from '../../__generated__/resolver-types';
import { COMMENT_EXAMPLE, Posts } from '../../mock_data';



const queries: QueryResolvers = {
    allPosts: () => {
        return Posts;
    },
    post: (_, params, __) => {
        return {
            id: params.id,
            title: 'wow new post',
            date: '29/04/2023',
            text: 'Loreium *hulorium*',
            amountOfLikes: 0,
            amountOfComments: 0,
            comments: [COMMENT_EXAMPLE, COMMENT_EXAMPLE]
        }
    }
};

export default queries;