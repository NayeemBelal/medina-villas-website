import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Bylaws from './pages/Bylaws'
import Contacts from './pages/Contacts'
import ContactUs from './pages/ContactUs'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import './App.css'

function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/bylaws" element={<SiteLayout><Bylaws /></SiteLayout>} />
          <Route path="/contacts" element={<SiteLayout><Contacts /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><ContactUs /></SiteLayout>} />
          <Route path="/gallery" element={<SiteLayout><Gallery /></SiteLayout>} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}

export default App
