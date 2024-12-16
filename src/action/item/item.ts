import { d1DatabasePrisma } from "../../util";


export async function get_item (db: D1Database) {
    const prisma = await d1DatabasePrisma(db)
    const response = prisma.task.findMany()
    return response
}