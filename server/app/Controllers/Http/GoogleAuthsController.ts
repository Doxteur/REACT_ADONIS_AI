import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class GoogleAuthController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use("google").redirect();
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use("google");

    try {
      const googleUser = await google.user();

      const user = await User.firstOrCreate(
        { email: googleUser.email as string },
        {
          name: googleUser.name as string,
          email: googleUser.email as string,
        }
      );

      await auth.use("api").login(user);

      return response.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      return response.internalServerError("Une erreur est survenue");
    }
  }

  public async loginFromClient({
    request,
    auth,
    response,
  }: HttpContextContract) {
    const { email, name } = request.all();

    const user = await User.firstOrCreate(
      { email: email as string },
      {
        name: name as string,
        email: email as string,
      }
    );

    const token = await auth.use("api").generate(user);

    return response.json({
      user,
      token: token.token,
    });
  }
}
