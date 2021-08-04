import { ADMIN_ROUTE, MAINPAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RUCHKA_ROUTE, CHIP_ROUTE, DEVICE_ROUTE, PASSPORT_ROUTE, WORKER_ROUTE, PERSONAL_ROUTE } from "./utils/constant"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import RuchkaPage from "./pages/ProductsPage/RuchkaPage"
import MainPage from "./pages/MainPage"
import ChipPage from "./pages/ProductsPage/ChipPage"
import DevicePage from "./pages/ProductsPage/DevicePage"
import PassportPage from "./pages/ProductsPage/PassportPage"
import WorkerPage from "./pages/WorkerPage"
import Personal from "./pages/Personal"

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
        path:RUCHKA_ROUTE,
        Component:RuchkaPage
    },
    {
      path:MAINPAGE_ROUTE,
      Component:MainPage
     },
  {
      path:CHIP_ROUTE,
      Component:ChipPage
  },
  {
      path:DEVICE_ROUTE,
      Component:DevicePage
  },
  {
      path:PASSPORT_ROUTE,
      Component:PassportPage
  },{
    path: WORKER_ROUTE + '/:id',
    Component: WorkerPage
},{
    path: PERSONAL_ROUTE ,
    Component: Personal
},

]