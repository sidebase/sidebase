import type { AnySchema } from 'yup'
import { createError } from 'h3'
import type { CompatibilityEvent } from 'h3'

const apiValidateWithSchema = async (data: any, schema: AnySchema) => {
  try {
    return await schema.validate(data, { stripUnknown: true })
  } catch (error) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Data validation failed',
      data: error,
    })
  }
}

export const useParamsAs = async (event: CompatibilityEvent, paramsSchema: AnySchema) => {
  const params = event.context.params
  return await apiValidateWithSchema(params, paramsSchema)
}
