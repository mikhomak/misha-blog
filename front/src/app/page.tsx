import BlogShort from "@/components/blog-short/blog-short";
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-ssr-client'
import { Post } from "@/__generated__/graphql";

const postQuery = gql`query GetAllPosts {
  allPosts{
    id
    shortText
    title
    text
    amountOfLikes
    createdAt
    amountOfComments
  }
}
`

export default async function Home() {
  const { data } = await getClient().query({ query: postQuery});
  const posts = data.allPosts as [Post];
  return (
    <main>
      {posts.map((post) =>
        <BlogShort post={post} key={post.id}/>
      )}
    </main>
  )
}
