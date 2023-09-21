import DataLoader from "dataloader";
export class PostModelsDataSource {
    constructor(prismaClient) {
        this.batchPosts = new DataLoader(async (ids) => {
            return await this.prismaClient.postModel.findMany({
                where: { id: { in: ids } },
                include: { comments: true }
            });
        });
        this.prismaClient = prismaClient;
    }
    async findPostModelById(id) {
        return await this.batchPosts.load(id);
    }
}
