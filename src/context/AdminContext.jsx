import { createContext, useContext, useState, useEffect } from 'react'

const CREDENTIALS = { username: 'test', password: '123' }

export const DEFAULT_CONTENT = {
  // Home
  'home.heroDesc': 'A distinguished community where neighbors become family,\nand every day feels like home.',
  'home.welcomeHeading': 'Life at Medina Villas',
  'home.welcomeBody1': 'Nestled in the heart of a vibrant neighborhood, Medina Villas is more than an address — it\'s a way of life. Our tree-lined streets, beautifully maintained common areas, and warm community spirit make this one of the most sought-after places to call home.',
  'home.welcomeBody2': 'The Medina Villas HOA is dedicated to preserving the beauty, safety, and harmony of our neighborhood. We work together to maintain high standards, resolve concerns promptly, and organize events that bring our community closer together.',
  // Bylaws
  'bylaws.intro': 'The following bylaws govern the Medina Villas Homeowners Association. They have been established to ensure the harmonious operation of our community and to protect the interests and property values of all residents. We ask that every homeowner familiarize themselves with these governing principles.',
  'bylaws.pullquote': '"A community governed with care, transparency, and respect for every homeowner — that is the promise of Medina Villas."',
  // Contacts
  'contacts.intro': 'Below is a curated list of trusted service providers recommended by Medina Villas residents. Please note these are community recommendations — always verify credentials and get multiple quotes before hiring.',
  // Contact Us
  'contact.infoBody': 'Have a question, concern, or suggestion? The Medina Villas HOA Board is always available to hear from residents. Please reach out and we will respond within 2–3 business days.',
  'contact.email': 'board@medinavillashoa.com',
  'contact.phone': '(214) 555-0100',
  'contact.hours': 'Mon–Fri, 9am–5pm',
  'contact.address': 'Medina Villas, TX',
}

export const DEFAULT_CONTACTS = [
  {
    id: 'handyman',
    icon: '🔨',
    title: 'General Handyman',
    subtitle: 'Repairs, Maintenance & Odd Jobs',
    contacts: [
      { id: 'h1', name: 'Robert Martinez', phone: '(214) 555-0142', note: 'Available weekends' },
      { id: 'h2', name: 'James Wilson', phone: '(214) 555-0187', note: 'Full-service repairs' },
      { id: 'h3', name: 'David Chen', phone: '(972) 555-0234', note: 'Licensed & insured' },
    ],
  },
  {
    id: 'plumber',
    icon: '🔧',
    title: 'Plumbing',
    subtitle: 'Pipes, Leaks & Water Systems',
    contacts: [
      { id: 'p1', name: 'Carlos Rivera', phone: '(214) 555-0358', note: '24hr emergency service' },
      { id: 'p2', name: 'Michael Thompson', phone: '(972) 555-0291', note: 'Residential specialist' },
    ],
  },
  {
    id: 'mechanic',
    icon: '🚗',
    title: 'Auto Mechanics',
    subtitle: 'Vehicle Repair & Maintenance',
    contacts: [
      { id: 'm1', name: 'Tony Garcia', phone: '(214) 555-0476', note: 'All makes & models' },
      { id: 'm2', name: 'Kevin Patel', phone: '(972) 555-0512', note: 'Mobile service available' },
      { id: 'm3', name: 'Luis Hernandez', phone: '(214) 555-0638', note: 'Certified technician' },
    ],
  },
  {
    id: 'electrical',
    icon: '⚡',
    title: 'Electrical',
    subtitle: 'Wiring, Panels & Fixtures',
    contacts: [
      { id: 'e1', name: 'Eric Johnson', phone: '(214) 555-0723', note: 'Master electrician' },
      { id: 'e2', name: 'Samuel Brown', phone: '(972) 555-0849', note: 'Licensed & bonded' },
    ],
  },
  {
    id: 'landscaping',
    icon: '🌿',
    title: 'Landscaping',
    subtitle: 'Lawn Care & Garden Services',
    contacts: [
      { id: 'l1', name: 'Marco Delgado', phone: '(214) 555-0917', note: 'Weekly maintenance' },
      { id: 'l2', name: 'Andre Williams', phone: '(972) 555-0153', note: 'Design & installation' },
      { id: 'l3', name: 'Rosa Flores', phone: '(214) 555-0284', note: 'Irrigation specialist' },
    ],
  },
  {
    id: 'painting',
    icon: '🎨',
    title: 'Painting',
    subtitle: 'Interior & Exterior',
    contacts: [
      { id: 'pa1', name: 'Frank Nguyen', phone: '(214) 555-0391', note: 'Residential expert' },
      { id: 'pa2', name: 'Isaiah Scott', phone: '(972) 555-0467', note: 'Eco-friendly paints' },
    ],
  },
]

const AdminContext = createContext(null)

function load(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('mv_admin') === 'true'
  )
  const [content, setContent] = useState(() => load('mv_content', DEFAULT_CONTENT))
  const [gallery, setGallery] = useState(() => load('mv_gallery', []))
  const [serviceContacts, setServiceContacts] = useState(() => load('mv_contacts', DEFAULT_CONTACTS))

  useEffect(() => { localStorage.setItem('mv_content', JSON.stringify(content)) }, [content])
  useEffect(() => { localStorage.setItem('mv_gallery', JSON.stringify(gallery)) }, [gallery])
  useEffect(() => { localStorage.setItem('mv_contacts', JSON.stringify(serviceContacts)) }, [serviceContacts])

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem('mv_admin', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('mv_admin')
    setIsAuthenticated(false)
  }

  const updateContent = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const addGalleryPhoto = (dataUrl, caption) => {
    setGallery(prev => [
      ...prev,
      { id: Date.now().toString(), dataUrl, caption, uploadedAt: new Date().toISOString() }
    ])
  }

  const removeGalleryPhoto = (id) => {
    setGallery(prev => prev.filter(p => p.id !== id))
  }

  const updateContact = (catId, contactId, field, value) => {
    setServiceContacts(prev => prev.map(cat =>
      cat.id === catId
        ? { ...cat, contacts: cat.contacts.map(c => c.id === contactId ? { ...c, [field]: value } : c) }
        : cat
    ))
  }

  const addContact = (catId) => {
    const newContact = { id: Date.now().toString(), name: 'New Contact', phone: '(000) 000-0000', note: '' }
    setServiceContacts(prev => prev.map(cat =>
      cat.id === catId ? { ...cat, contacts: [...cat.contacts, newContact] } : cat
    ))
  }

  const removeContact = (catId, contactId) => {
    setServiceContacts(prev => prev.map(cat =>
      cat.id === catId ? { ...cat, contacts: cat.contacts.filter(c => c.id !== contactId) } : cat
    ))
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      content, updateContent,
      gallery, addGalleryPhoto, removeGalleryPhoto,
      serviceContacts, updateContact, addContact, removeContact,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}

export function useContent(key) {
  const { content } = useAdmin()
  return content[key] ?? DEFAULT_CONTENT[key] ?? ''
}
