-- CreateTable
CREATE TABLE "PostModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "shortText" TEXT,
    "content" TEXT,
    "amountOfLikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentModel" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "CommentModel_pkey" PRIMARY KEY ("id","postId")
);

-- AddForeignKey
ALTER TABLE "CommentModel" ADD CONSTRAINT "CommentModel_postId_fkey" FOREIGN KEY ("postId") REFERENCES "PostModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
