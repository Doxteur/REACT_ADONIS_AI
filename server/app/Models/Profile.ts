import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public role: string | null

  @column()
  public location: string | null

  @column()
  public avatar: string | null

  @column()
  public firstName: string | null

  @column()
  public lastName: string | null

  @column()
  public phone: string | null

  @column()
  public country: string | null

  @column()
  public cityState: string | null

  @column()
  public postalCode: string | null

  @column()
  public taxId: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
