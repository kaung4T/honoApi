import { create_item, delete_item, get_item, update_item } from '../../action/item/item';
import { Bindings } from './../../index';
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { itemRoute, itemRouteCreate, itemRouteDelete, itemRouteUpdate } from './route';


export const itemApi = new OpenAPIHono<{Bindings: Bindings}>();

itemApi.openapi(itemRoute, async (c) => {
    const { userId } = c.req.valid('param')
    try {
    const resposne = await get_item(c.env.DB)
      const context = {
        data: resposne,
        param: c.req.param("userId")
      }
      return c.json(context)
    }
    catch (e) {
      return c.json({ error: e })
    }
  })

itemApi.openapi(itemRouteCreate, async (c) => {
  const body = c.req.valid('json')
  try {
    const prisma = await create_item(c.env.DB)
    const task = await prisma.task.create({ data: body })

    return c.json(task, 201)
  }
  catch (e) {
    return c.json({ error: e })
  }
})

itemApi.openapi(itemRouteUpdate, async (c) => {
  const body = c.req.valid('json')
  const { taskId } = c.req.valid('param')
  try {
    const prisma = await update_item(c.env.DB)
    const response = await prisma.task.update({
      data: body,
      where: {id: Number(taskId)}
    })
    return c.json({data: response})
  }
  catch (e) {
    return c.json({error: e})
  }
})

itemApi.openapi(itemRouteDelete, async (c) => {
  const { taskId } = c.req.valid('param')
  try {
    const prisma = await delete_item(c.env.DB)
    const response = await prisma.task.delete({
      where: {id: Number(taskId)}
    })
    return c.json({data: 'success'})
  }
  catch (e) {
    return c.json({error: e})
  }
})

