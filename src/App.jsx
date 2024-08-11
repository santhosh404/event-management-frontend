import { Route, Routes } from 'react-router-dom'
import Navbar from './components/resuable/Navbar'
import { publicRoutes } from './routes'

function App() {

  return (
    <>
      <Routes>
        {
          publicRoutes.map((route, index) => <Route key={index} element={<route.component />} path={route.path} />)
        }
      </Routes>
    </>
  )
}

export default App
