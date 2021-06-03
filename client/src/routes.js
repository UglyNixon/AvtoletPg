import { ADMIN_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, WORKER_ROUTE } from "./utils/constant"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Worker from "./pages/Worker"
import Main from "./pages/Main"

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component:Admin
    }
]
export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
      {
        path:WORKER_ROUTE +'/:id',
        Component:Worker
    },
    {
      path:MAIN_ROUTE,
      Component:Main
  }

]