import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users = [
      {
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        profile: {
          role: "Team Manager",
          location: "Leeds, United Kingdom",
          avatar: "/placeholder.svg?height=80&width=80",
          firstName: "Rafiqur",
          lastName: "Rahman",
          phone: "+09 345 346 46",
          country: "United Kingdom",
          cityState: "Leeds, East London",
          postalCode: "ERT 2354",
          taxId: "AS45645756",
        },
      },
      // Vous pouvez ajouter d'autres utilisateurs ici si nécessaire
    ];

    for (const userData of users) {
      const { profile, ...userInfo } = userData;
      const user = await User.create({
        ...userInfo,
        password: await Hash.make(userInfo.password),
      });

      await user.related("profile").create(profile);
    }
  }
}
