import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Review from './Review'
import Offer from './Offer'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  public restaurantId: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public postalCode: string

  @column()
  public phoneNumber: string

  @column()
  public email: string

  @column()
  public categoryIds: number[]

  @column()
  public image: string

  @column()
  public hours: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship with Reviews
  @hasMany(() => Review)
  public reviews: HasMany<typeof Review>

  // Relationship with Offers
  @hasMany(() => Offer) // This establishes the relationship with the Offer model
  public offers: HasMany<typeof Offer>
}
