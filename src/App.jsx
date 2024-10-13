import './App.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Host/Dashboard.jsx'
import Income from './pages/Host/Income.jsx'
import Reviews from './pages/Host/Reviews.jsx'
import About from './pages/About.jsx'
import Vans, { loader as vansLoader } from './pages/Vans/Vans.jsx'
import VanDetail, {loader as vanDetailLoader} from './pages/Vans/VanDetail.jsx'
import HostLayout from './components/HostLayout.jsx'
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans.jsx'
import HostVanDetail, { loader as hostVansDetailLoader } from './pages/Host/HostVansDetail.jsx'
import HostVanPricing from './pages/Host/HostVanPricing.jsx'
import HostVanPhotos from './pages/Host/HostVanPhotos.jsx'
import HostVanInfo from './pages/Host/HostVanInfo.jsx'
import NotFound from './pages/Not Found.jsx'
import Error from './components/Error.jsx'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login.jsx'
import { requireAuth } from '../utils.js'

const router = createBrowserRouter ( createRoutesFromElements (

  <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />

      <Route path='host' element={<HostLayout />} loader={async () => await requireAuth()} >
          <Route index element={<Dashboard />} loader={async () => await requireAuth()} />
          <Route path='income' element={<Income />} loader={async () => await requireAuth()} />
          <Route path='reviews' element={<Reviews />} loader={async () => await requireAuth()} />
          <Route path='vans' element={<HostVans />} loader={hostVansLoader} />

          <Route path='vans/:id' element={<HostVanDetail />} loader={hostVansDetailLoader} >
              <Route index element={<HostVanInfo />} loader={async () => await requireAuth()} />
              <Route path='pricing' element={<HostVanPricing />} loader={async () => await requireAuth()} />
              <Route path='photos' element={<HostVanPhotos />} loader={async () => await requireAuth()} />
          </Route>
      </Route>
    <Route path='*' element={<NotFound />} />
  </Route>

) )

function App() {
  
  return (

      <RouterProvider router={router} />

  )
}

export default App