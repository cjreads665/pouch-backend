Why not import @prisma/client directly everywhere?

If you call new PrismaClient() in multiple files, you’ll end up with multiple DB connections. That can cause issues like connection leaks.

Having a single shared instance (like in prismaClient.ts) is best practice.