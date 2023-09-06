export const POST_EXAMPLE = {
    id: '123',
    title: 'hello hello',
    date: '23/04/2023',
    text: '**asdas**asd asd asd qwe qkjnmqkjbn qkwnbdqjwn dqwndkwqndqwkn dqlwkd nqwkl dnqw kdljqnwkl',
    amountOfLikes: 30,
    amountOfComments: 10
}
export const COMMENT_EXAMPLE = {
    id: '123',
    author: "Misha",
    date: 'July 2023',
    text: "What an amazing article",
    post: POST_EXAMPLE
}

export const Posts = [{
    ...POST_EXAMPLE,
    comments: [COMMENT_EXAMPLE]
},
{
    ...POST_EXAMPLE,
    comments: [COMMENT_EXAMPLE]
},
{
    ...POST_EXAMPLE,
    comments: [COMMENT_EXAMPLE]
}]