import './App.css'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SEM from './pages/SEM'
import IAQ from './pages/IAQ'
import EchoLogger from './pages/EchoLogger'
import EMS from './pages/EMS'
import FumeHood from './pages/FumeHood'

function App() {
  return (
    <Router>
      <main className='bg-black'>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <Highlights/>
            </>
          }/>
          <Route path='/sem' element={<SEM/>}/>
          <Route path='/iaq' element={<IAQ/>}/>
          <Route path='/echoLogger' element={<EchoLogger/>}/>
          <Route path='/ems' element={<EMS/>}/>
          <Route path='/fumeHood' element={<FumeHood/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App