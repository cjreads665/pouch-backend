import prisma from "../db/prisma.js";



export async function createBookmark(title:string,url:string){
    return prisma.bookmark.create({
        data: {
            title,
            url,
            userId: 1 // Temporary hardcoded userId for demonstration purposes
        }
    })
}

export async function modifyBookmark(id:number, data: {title?:string, url?:string}){
    return prisma.bookmark.update({
        where: {id},
        data
    })
}

export async function getAllBookmarks(order:"asc" | "desc" = "desc") {
    return prisma.bookmark.findMany({
        orderBy: {
            updatedAt: order
        },
    })
}

export async function deleteBookmark(id:number){
    return prisma.bookmark.delete({
        where: {id}
    })
}
