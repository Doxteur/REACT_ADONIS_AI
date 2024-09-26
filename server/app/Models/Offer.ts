import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Restaurant from './Restaurant'
import Category from './Category'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public offerId: number

  @column()
  public restaurantId: number

  @column()
  public categoryId: number

  @column()
  public userId: number

  @column()
  public code: string

  @column()
  public name: string

  @column()
  public offerType: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public conditions: string

  @column()
  public image: string

  @column()
  public isExclusive: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship with Restaurant
  @belongsTo(() => Restaurant)
  public restaurant: BelongsTo<typeof Restaurant>

  // Relationship with Category
  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
