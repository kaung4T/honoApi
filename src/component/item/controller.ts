import { get_item } from '../../action/item/item';
import { Bindings } from './../../index';
import { OpenAPIHono, z } from "@hono/zod-openapi";


export const itemApi = new OpenAPIHono<{Bindings: Bindings}>();

itemApi.openapi({
    path: 'items/{userId}',
    method: 'get',
    request: {
      params: z.object({
        userId: z.string().openapi({
          param: {
            name: "userId",
            in: "path"
          }
        })
      })
    },
    responses: {
      200: {
        description: ''
      }
    }
  }, async (c) => {
    const {userId} = c.req.valid("param")
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


