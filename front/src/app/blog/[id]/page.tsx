import { Post } from "@/__generated__/graphql";
import CommentArea from "@/components/comment-area/comment-area";
import Likes from "@/components/likes/likes";
import { getClient } from "@/lib/apollo-ssr-client";
import { gql } from "@apollo/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


const postQuery = gql`query FindPost {
  post(id : 1){
    title
    text
    amountOfLikes
    date
    comments{
      author
      date
      id
      text
    }
  }
}
`

export default async function Blog() {
  const client = getClient();
  const { data } = await client.query({ query: postQuery });
  const post = data.post as Post;
  return (
    <div className="max-w-screen-lg my-4">
      <ReactMarkdown>{post.text}</ReactMarkdown>
      <hr />
      <Likes amountOfLikes={12} />
      <CommentArea comments={post.comments!} />
    </div>
  )
}
