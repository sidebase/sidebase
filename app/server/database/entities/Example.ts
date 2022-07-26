import { Column, Entity } from 'typeorm'
import { Base } from './Base'

@Entity()
export class Example extends Base {
  @Column('text')
    description!: string

  @Column('text')
    details!: string
}
