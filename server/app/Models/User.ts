import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public roleId: number

  @column()
  public status: string

  // New fields based on your specifications
  @column()
  public address: string

  @column()
  public birthDate: DateTime

  @column()
  public country: string

  @column()
  public city: string

  @column()
  public postalCode: string

  @column()
  public phoneNumber: string

  @column()
  public username: string

  @column()
  public subscription: string

  @column()
  public subscriptionType: string

  @column()
  public subscriptionStartDate: DateTime

  @column()
  public subscriptionEndDate: DateTime

  @column()
  public isEmailVerified: boolean

  @column()
  public preferences: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship with Role
  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  // Relationship with Profile
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
