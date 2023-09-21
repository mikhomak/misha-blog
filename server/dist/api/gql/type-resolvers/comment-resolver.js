const commentResolver = {
    author: (parent) => parent.author,
    createdAt: (parent) => parent.createdAt,
    text: (parent) => parent.text
};
export default commentResolver;
