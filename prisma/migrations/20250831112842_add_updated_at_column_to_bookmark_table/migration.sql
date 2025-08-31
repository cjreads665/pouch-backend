-- CreateTable
CREATE TABLE "public"."bookmarks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bookmarks_pk" PRIMARY KEY ("id")
);
