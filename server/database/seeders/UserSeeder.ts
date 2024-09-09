import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from '../../app/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.create({
      name: 'admin',
    })
    const role = await Role.findBy('name', 'admin')
    await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: await Hash.make('admin'),
      roleId: role?.id,
      status: 'active',
    })
  }
}
