


import { Comment } from '@/__generated__/graphql';
import React, { useContext, useState } from 'react';

const CommentsContext = React.createContext<Comment[]>([])
const CommentsUpdateContetx = React.createContext<(comments: Comment[]) => void>(() => { });

export function useCommentsContext() {
    return useContext(CommentsContext);
}

export function useCommentsUpdateContext() {
    return useContext(CommentsUpdateContetx);
}

export function CommentsProvider({ children, comments }: React.PropsWithChildren & { comments: Comment[] }) {
    const [postComments, setPostComments] = useState(comments);

    return (
        <CommentsContext.Provider value={postComments}>
            <CommentsUpdateContetx.Provider value={setPostComments}>
                {children}
            </CommentsUpdateContetx.Provider>
        </CommentsContext.Provider>
    )

}