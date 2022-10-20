import { Column, Entity } from 'typeorm'
import { z } from '@sidebase/nuxt-parse'
import { Base } from './Base'

@Entity()
export class Example extends Base {
  @Column('text')
  description!: string

  @Column('text')
  details!: string
}

// Specify what fields can be updated and how these fields can be updated. This prevents from unwanted updates with malicious, bad, ... data
export const exampleUpdate = z.object({
  description: z.string().optional(),
  details: z.string().optional(),
})

// Customize this using `.omit` or `.pick` to hide / show some attributes that we do not want to pass to the user
export const exampleFull = z.instanceof(Example)
