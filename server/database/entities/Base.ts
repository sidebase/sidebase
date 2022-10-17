import type { FindManyOptions, FindOneOptions } from 'typeorm'
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'
import { createError } from 'h3'

/**
 * Base to extend from. This base provides some additional nice-ness to the typeorm `BaseEntity` to make integration with `nuxt3` easy.
 */
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  /**
     * Updates entity-instance that match given options or throw a `404` error.
     *
     * Use like:
     * ```
     * const entity = X.findOneOrThrow({ where: { id: 1 }})
     *
     * entity.update({ some, properties, to, update })
     * ```
     *
     * Note: This approach ensures that any hooks (e.g., `beforeUpdate`) are
     * correctly triggered in contrast to the static `save` method.
     */
  async update(object: Record<string, any>) {
    for (const [key, value] of Object.entries(object)) {
      // @ts-expect-error Any updat
      this[key] = value
    }

    await this.save()

    return this
  }

  /**
     * Finds entity that match given options or throw a `404` error.
     *
     * Use like:
     * ```
     * // `options`, are optional
     * const options = { where: { id: 'some-id' }}
     *
     * // Will return `X` or throw a `404` api error
     * X.findOneOrThrow(options)
     * ```
     */
  static async findOneOrThrow<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    options: FindOneOptions<T> = {},
  ): Promise<T> {
    let result: T
    try {
      result = await this.getRepository<T>().findOneOrFail(options)
    } catch (error) {
      console.error(error)
      throw createError({ statusCode: 404, statusMessage: 'Failed to find desired record' })
    }

    return result
  }

  /**
     * Finds entities that match given options or throw a `404` error
     *
     * Use like:
     * ```
     * // `options`, are optional
     * const options = { where: { id: 'some-id' }}
     *
     * // Will return `X[]` or throw a `404` api error
     * X.findMany(options)
     * ```
     */
  static async findMany<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    options: FindManyOptions<T> = {},
  ): Promise<T[]> {
    const result: T[] = await this.getRepository<T>().find(options)
    return result
  }
}
