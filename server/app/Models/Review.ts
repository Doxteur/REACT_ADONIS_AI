import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Restaurant from './Restaurant'
import Offer from './Offer'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public reviewId: number

  @column()
  public offerId: number

  @column()
  public restaurantId: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public image: string

  @column()
  public userId: number

  // Relationship with Restaurant
  @belongsTo(() => Restaurant)
  public restaurant: BelongsTo<typeof Restaurant>

  // Relationship with Offer
  @belongsTo(() => Offer)
  public offer: BelongsTo<typeof Offer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
