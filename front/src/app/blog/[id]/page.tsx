import { Post } from "@/__generated__/graphql";
import notFound from "@/app/not-found";
import CommentArea from "@/components/comment-area/comment-area";
import Likes from "@/components/likes/likes";
import { getClient } from "@/lib/apollo-ssr-client";
import { gql } from "@apollo/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


const postQuery = gql`query FindPost($postId: ID) {
  post(id : $postId){
    id
    title
    text
    amountOfLikes
    createdAt
    comments {
      author
      createdAt
      id
      text
    }
    amountOfComments
  }
}
`


export default async function Blog({ params }: { params: { id: string } }) {
  const client = getClient();
  try {
    const { data } = await client.query({
      query: postQuery,
      variables: {
        postId: params.id
      }
    });

    const post = data.post as Post;
    return (
      <div className="max-w-screen-lg my-4">
        <ReactMarkdown>{post.text}</ReactMarkdown>
        <hr />
        <Likes amountOfLikes={post.amountOfLikes || 0} postId={post.id}/>
        <CommentArea comments={post.comments || []} postId={post.id} />
      </div>
    )
  } catch (exception) {
    return notFound()
  }
}
