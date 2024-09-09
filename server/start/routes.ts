import Route from '@ioc:Adonis/Core/Route'
import AutoSwagger from 'adonis-autoswagger'
import swagger from 'Config/swagger'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


// Groupe de routes authentifiées
Route.group(() => {
  Route.get('/', 'UsersController.index').as('users.index')
}).middleware('auth')

// Routes d'authentification
Route.group(() => {
  Route.post('/login', 'AuthController.login').as('auth.login')
  Route.post('/logout', 'AuthController.logout').as('auth.logout')
  Route.get('/me', 'AuthController.me').as('auth.me')
  Route.post('/register', 'AuthController.register').as('auth.register')
}).prefix('/auth')

// Routes de documentation
Route.get('/swagger', async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger)
})
Route.get('/docs', async () => {
  return AutoSwagger.ui('/swagger', swagger)
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})
