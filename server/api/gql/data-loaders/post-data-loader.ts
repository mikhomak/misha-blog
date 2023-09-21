import { CommentModel, PostModel, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export class PostModelsDataSource {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    private batchPosts = new DataLoader(async (ids: string[]) => {
        return await this.prismaClient.postModel.findMany(
            {
                where: { id: { in: ids } },
                include: { comments: true }
            });
    });

    async findPostModelById(id: string): Promise<PostModel & { comments: CommentModel[] }> {
        return await this.batchPosts.load(id);
    }
}
