import { d1DatabasePrisma } from "../../util";


export async function get_item (db: D1Database) {
    const prisma = await d1DatabasePrisma(db)
    const response = prisma.task.findMany()
    return response
}

export async function create_item (db: D1Database) {
    const prisma = await d1DatabasePrisma(db)
    return prisma
}

export async function update_item (db: D1Database) {
    const prisma = await d1DatabasePrisma(db)
    return prisma
}

export async function delete_item (db: D1Database) {
    const prisma = await d1DatabasePrisma(db)
    return prisma
}