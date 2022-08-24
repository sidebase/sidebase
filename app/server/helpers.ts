import { createError, useBody, useQuery } from 'h3'
import type { CompatibilityEvent } from 'h3'
import type { z } from 'zod'

const apiValidateWithSchema = <ZodSchema extends z.ZodTypeAny>(
  data: any,
  schema: ZodSchema,
  statusCode: number,
  statusMessage: string,
): z.infer<ZodSchema> => {
  try {
    return schema.parse(data)
  } catch (error) {
    throw createError({
      statusCode,
      statusMessage,
      data: error,
    })
  }
}

/**
 * Make a data parser that takes in an object `O` from which to extract data and a zod-data-schema. It then extracts data `D` from `O` to then parse and validate the data `D` using the zod schema.
 * This method will throw HTTP Exceptions (like 422 Unprocessible Entity) if data validation fails. The HTTP Error code and message can be customized.
 * @param {DataFetchingFunction} dataFetchingFunction - that accepts one argument (the `O`) and returns some data `D` from it
 * @param {number} errorCode - HTTP status code to return to client if parsing and validating `D` fails
 * @param {string} errorMessage - message to return to client if parsing and validating `D` fails
 */
type DataFetchingFunction<T> = (param: T) => any
const makeParser = <T>(dataFetchingFunction: DataFetchingFunction<T>, errorCode = 422, errorMessage = 'Data validation failed') => {
  const parser = async <ZodSchema extends z.ZodTypeAny>(input: Parameters<typeof dataFetchingFunction>[0], schema: ZodSchema) => {
    const data = await dataFetchingFunction(input)
    return apiValidateWithSchema(data, schema, errorCode, errorMessage)
  }

  return parser
}

// Generate parsing methods for different data-sources
export const parseBodyAs = makeParser(useBody<any>)
export const parseParamsAs = makeParser((event: CompatibilityEvent) => event.context.params)
export const parseQueryAs = makeParser(useQuery)

const messageForDeveloperErrors = 'Returned data does not match expected format, please contact your administrator'
export const parseDataAs = makeParser((data: Record<any, any>) => data, 500, messageForDeveloperErrors)
export const parseDataPromiseAs = makeParser(async (data: Promise<any>) => await data, 500, messageForDeveloperErrors)
