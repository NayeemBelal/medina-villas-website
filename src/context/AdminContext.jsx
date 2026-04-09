import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'


export const DEFAULT_CONTENT = {
  // Home
  'home.heroDesc': 'A distinguished community where neighbors become family,\nand every day feels like home.',
  'home.welcomeHeading': 'Life at Medina Villas',
  'home.welcomeBody1': 'Nestled in the heart of a vibrant neighborhood, Medina Villas is more than an address — it\'s a way of life. Our tree-lined streets, beautifully maintained common areas, and warm community spirit make this one of the most sought-after places to call home.',
  'home.welcomeBody2': 'The Medina Villas HOA is dedicated to preserving the beauty, safety, and harmony of our neighborhood. We work together to maintain high standards, resolve concerns promptly, and organize events that bring our community closer together.',
  // Bylaws
  'bylaws.intro': 'The following bylaws govern the Medina Villas Homeowners Association. They have been established to ensure the harmonious operation of our community and to protect the interests and property values of all residents. We ask that every homeowner familiarize themselves with these governing principles.',
  'bylaws.pullquote': '"A community governed with care, transparency, and respect for every homeowner — that is the promise of Medina Villas."',
  // Bylaws Articles
  'bylaws.I.title': 'Name & Purpose',
  'bylaws.I.para0': 'The organization shall be known as the Medina Villas Homeowners Association (hereinafter "the Association").',
  'bylaws.I.para1': 'The purpose of the Association is to promote the health, safety, welfare, and general well-being of the residents of Medina Villas, to manage and maintain the common areas, and to enforce the covenants and restrictions applicable to the neighborhood.',
  'bylaws.I.para2': 'The Association shall operate exclusively for the benefit of its members and the community as a whole, fostering a spirit of cooperation, mutual respect, and civic pride among all residents.',
  'bylaws.II.title': 'Membership',
  'bylaws.II.para0': 'Membership in the Association is automatic and mandatory for all property owners within the Medina Villas subdivision. Membership commences upon the recording of a deed conveying ownership of a lot within the subdivision.',
  'bylaws.II.para1': 'Each property owner shall be entitled to one (1) vote per lot owned on matters put before the Association membership, regardless of the number of individuals holding title to the property.',
  'bylaws.II.para2': 'Members in good standing — defined as those current in their dues obligations and not subject to disciplinary action — shall be eligible to vote, serve on committees, and hold elected office within the Association.',
  'bylaws.III.title': 'Annual Assessments & Dues',
  'bylaws.III.para0': 'Annual assessments shall be levied against each lot within the subdivision to fund the operating expenses and capital reserve of the Association. The amount of the annual assessment shall be determined by the Board of Directors and communicated to all members no less than thirty (30) days prior to the due date.',
  'bylaws.III.para1': 'Annual dues are payable on January 1st of each calendar year. Assessments not paid within thirty (30) days of the due date shall be considered delinquent and subject to a late fee as established by the Board.',
  'bylaws.III.para2': 'The Association shall have the authority to place a lien upon any property for which assessments remain unpaid in excess of ninety (90) days, in accordance with applicable state law.',
  'bylaws.IV.title': 'Board of Directors',
  'bylaws.IV.para0': 'The Association shall be governed by a Board of Directors consisting of five (5) elected members. Directors shall serve staggered two-year terms to ensure continuity of governance.',
  'bylaws.IV.para1': 'The Board shall meet not less than six (6) times per calendar year. Special meetings of the Board may be called by the President or by a majority of Directors upon five (5) days written notice.',
  'bylaws.IV.para2': 'The Board of Directors shall have the power to adopt, amend, and enforce rules and regulations governing the use of common areas and the conduct of residents, provided such rules are not inconsistent with these Bylaws.',
  'bylaws.V.title': 'Annual Meetings',
  'bylaws.V.para0': 'The Annual Meeting of the Association shall be held each year, the date, time, and location to be determined by the Board of Directors. Notice of the Annual Meeting shall be provided to all members not less than fourteen (14) days in advance.',
  'bylaws.V.para1': 'A quorum for the transaction of business at any membership meeting shall consist of members representing twenty percent (20%) of the total voting power of the Association, present in person or by proxy.',
  'bylaws.V.para2': 'The agenda for the Annual Meeting shall include, at minimum: a report from the President, a financial summary, election of directors (in applicable years), and an open forum for member questions and concerns.',
  'bylaws.VI.title': 'Property Standards',
  'bylaws.VI.para0': 'All property owners are responsible for maintaining their lots and structures in good condition and in compliance with the architectural standards established by the Association. Lawns shall be kept neat, trimmed, and free of weeds.',
  'bylaws.VI.para1': 'No exterior alterations, additions, or improvements — including but not limited to fencing, painting, landscaping modifications, or structural changes — shall be undertaken without prior written approval from the Architectural Review Committee.',
  'bylaws.VI.para2': 'Vehicles shall be parked in designated areas only. Inoperable, unlicensed, or commercial vehicles shall not be stored on residential lots or streets for extended periods. Recreational vehicles may be stored only in enclosed garages.',
  'bylaws.VII.title': 'Enforcement & Dispute Resolution',
  'bylaws.VII.para0': 'The Board of Directors shall have the authority to enforce these Bylaws and all applicable covenants, conditions, and restrictions. Upon identifying a violation, the Association shall provide written notice to the responsible party specifying the nature of the violation and a reasonable cure period.',
  'bylaws.VII.para1': 'Any member who believes they have been aggrieved by a decision of the Board or the Association shall have the right to request a hearing before the Board. Such request must be submitted in writing within thirty (30) days of the contested decision.',
  'bylaws.VII.para2': 'The Association encourages all disputes between neighbors to be resolved through good-faith communication and, where necessary, mediation. Legal action shall be considered only as a last resort after all other avenues have been exhausted.',
  'bylaws.VIII.title': 'Amendments',
  'bylaws.VIII.para0': 'These Bylaws may be amended at any annual or special meeting of the Association, provided that the proposed amendment has been included in the notice of the meeting distributed to all members.',
  'bylaws.VIII.para1': 'Adoption of an amendment shall require an affirmative vote of not less than two-thirds (2/3) of the votes cast at a duly constituted meeting at which a quorum is present.',
  'bylaws.VIII.para2': 'All amendments shall be effective upon adoption by the membership and shall be filed with the appropriate county recording office as required by applicable law.',
  // Contacts
  'contacts.intro': 'Below is a curated list of trusted service providers recommended by Medina Villas residents. Please note these are community recommendations — always verify credentials and get multiple quotes before hiring.',
  // Useful Links
  'links.intro': 'A curated collection of helpful resources for Medina Villas residents. Click any link to visit the resource in a new tab.',
  // Contact Us
  'contact.infoBody': 'Have a question, concern, or suggestion? The Medina Villas HOA Board is always available to hear from residents. Please reach out and we will respond within 2–3 business days.',
  'contact.email': 'board@medinavillashoa.com',
  'contact.phone': '(214) 555-0100',
  'contact.hours': 'Mon–Fri, 9am–5pm',
  'contact.address': 'Medina Villas, TX',
  // Board members
  'contact.board.0.name': 'Patricia Alvarez',
  'contact.board.0.role': 'President',
  'contact.board.1.name': 'Jonathan Pierce',
  'contact.board.1.role': 'Vice President',
  'contact.board.2.name': 'Diane Okonkwo',
  'contact.board.2.role': 'Treasurer',
}

export const DEFAULT_LINKS = [
  {
    id: 'city',
    icon: '🏛️',
    title: 'City Services',
    subtitle: 'Local Government & Utilities',
    links: [
      { id: 'c1', label: 'City of Dallas Website', url: 'https://dallascityhall.com', description: 'Official city portal for services and information' },
      { id: 'c2', label: 'Dallas Water Utilities', url: 'https://dallascityhall.com/departments/waterutilities', description: 'Pay water bills and report issues' },
    ],
  },
  {
    id: 'emergency',
    icon: '🚨',
    title: 'Emergency & Safety',
    subtitle: 'Important Numbers & Resources',
    links: [
      { id: 'e1', label: 'Non-Emergency Police', url: 'https://dallaspolice.net', description: 'Dallas Police Department non-emergency line' },
      { id: 'e2', label: 'Oncor Outage Center', url: 'https://www.oncor.com/outages', description: 'Report and track power outages' },
    ],
  },
  {
    id: 'community',
    icon: '🏘️',
    title: 'Community Resources',
    subtitle: 'Neighborhood & HOA Links',
    links: [
      { id: 'co1', label: 'HOA Documents Portal', url: '#', description: 'Access governing documents and meeting minutes' },
      { id: 'co2', label: 'Nextdoor – Medina Villas', url: 'https://nextdoor.com', description: 'Connect with neighbors on Nextdoor' },
    ],
  },
]

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

// Maps "admin" username → the Supabase email account
const USERNAME_TO_EMAIL = { admin: 'admin@medinavillashoa.com' }

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [contentLoading, setContentLoading] = useState(true)
  const [gallery, setGallery] = useState([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [serviceContacts, setServiceContacts] = useState(DEFAULT_CONTACTS)
  const [contactsLoading, setContactsLoading] = useState(true)
  const [usefulLinks, setUsefulLinks] = useState(DEFAULT_LINKS)
  const [linksLoading, setLinksLoading] = useState(true)

  // Restore session from Supabase on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Load site content from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from('site_content').select('key, value')
      if (!error && data && data.length > 0) {
        const merged = { ...DEFAULT_CONTENT }
        data.forEach(row => { merged[row.key] = row.value })
        setContent(merged)
      }
      setContentLoading(false)
    }
    fetchContent()
  }, [])

  // Load service contacts from Supabase
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('service_contacts')
        .select('id, data')
        .order('data->title')
      if (!error && data && data.length > 0) {
        setServiceContacts(data.map(row => ({ id: row.id, ...row.data })))
      }
      setContactsLoading(false)
    }
    fetchContacts()
  }, [])

  // Load useful links from Supabase
  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase
        .from('useful_links')
        .select('id, data')
        .order('data->title')
      if (!error && data && data.length > 0) {
        setUsefulLinks(data.map(row => ({ id: row.id, ...row.data })))
      }
      setLinksLoading(false)
    }
    fetchLinks()
  }, [])

  // Load gallery from Supabase
  useEffect(() => {
    const fetchGallery = async () => {
      setGalleryLoading(true)
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('uploaded_at', { ascending: false })
      if (!error && data) {
        const withUrls = data.map(p => ({
          ...p,
          url: supabase.storage.from('gallery').getPublicUrl(p.storage_path).data.publicUrl
        }))
        setGallery(withUrls)
      }
      setGalleryLoading(false)
    }
    fetchGallery()
  }, [])

  const login = async (username, password) => {
    const email = USERNAME_TO_EMAIL[username.toLowerCase()] || username
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, message: error.message }
    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const updateContent = async (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
    await supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() })
  }

  const addGalleryPhoto = async (file, caption) => {
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(path, file, { contentType: file.type })
    if (uploadError) return { success: false, message: uploadError.message }

    const { error: dbError, data } = await supabase
      .from('gallery_photos')
      .insert({ storage_path: path, caption })
      .select()
      .single()
    if (dbError) return { success: false, message: dbError.message }

    const url = supabase.storage.from('gallery').getPublicUrl(path).data.publicUrl
    setGallery(prev => [{ ...data, url }, ...prev])
    return { success: true }
  }

  const removeGalleryPhoto = async (id, storagePath) => {
    await supabase.storage.from('gallery').remove([storagePath])
    await supabase.from('gallery_photos').delete().eq('id', id)
    setGallery(prev => prev.filter(p => p.id !== id))
  }

  const persistContacts = async (updated, previous) => {
    const upserts = updated.map(({ id, ...rest }) => ({ id, data: rest }))
    await supabase.from('service_contacts').upsert(upserts)
    const deletedIds = previous
      .filter(c => !updated.find(u => u.id === c.id))
      .map(c => c.id)
    if (deletedIds.length > 0) {
      await supabase.from('service_contacts').delete().in('id', deletedIds)
    }
  }

  const updateContact = (catId, contactId, field, value) => {
    setServiceContacts(prev => {
      const updated = prev.map(cat =>
        cat.id === catId
          ? { ...cat, contacts: cat.contacts.map(c => c.id === contactId ? { ...c, [field]: value } : c) }
          : cat
      )
      persistContacts(updated, prev)
      return updated
    })
  }

  const addContact = (catId) => {
    const newContact = { id: Date.now().toString(), name: 'New Contact', phone: '(000) 000-0000', note: '' }
    setServiceContacts(prev => {
      const updated = prev.map(cat =>
        cat.id === catId ? { ...cat, contacts: [...cat.contacts, newContact] } : cat
      )
      persistContacts(updated, prev)
      return updated
    })
  }

  const removeContact = (catId, contactId) => {
    setServiceContacts(prev => {
      const updated = prev.map(cat =>
        cat.id === catId ? { ...cat, contacts: cat.contacts.filter(c => c.id !== contactId) } : cat
      )
      persistContacts(updated, prev)
      return updated
    })
  }

  const addCategory = (icon, title, subtitle) => {
    const newCat = { id: Date.now().toString(), icon, title, subtitle, contacts: [] }
    setServiceContacts(prev => {
      const updated = [...prev, newCat]
      persistContacts(updated, prev)
      return updated
    })
    return newCat.id
  }

  const persistLinks = async (updated, previous) => {
    const upserts = updated.map(({ id, ...rest }) => ({ id, data: rest }))
    await supabase.from('useful_links').upsert(upserts)
    const deletedIds = previous
      .filter(c => !updated.find(u => u.id === c.id))
      .map(c => c.id)
    if (deletedIds.length > 0) {
      await supabase.from('useful_links').delete().in('id', deletedIds)
    }
  }

  const updateLink = (catId, linkId, field, value) => {
    setUsefulLinks(prev => {
      const updated = prev.map(cat =>
        cat.id === catId
          ? { ...cat, links: cat.links.map(l => l.id === linkId ? { ...l, [field]: value } : l) }
          : cat
      )
      persistLinks(updated, prev)
      return updated
    })
  }

  const addLink = (catId) => {
    const newLink = { id: Date.now().toString(), label: 'New Link', url: 'https://', description: '' }
    setUsefulLinks(prev => {
      const updated = prev.map(cat =>
        cat.id === catId ? { ...cat, links: [...cat.links, newLink] } : cat
      )
      persistLinks(updated, prev)
      return updated
    })
  }

  const removeLink = (catId, linkId) => {
    setUsefulLinks(prev => {
      const updated = prev.map(cat =>
        cat.id === catId ? { ...cat, links: cat.links.filter(l => l.id !== linkId) } : cat
      )
      persistLinks(updated, prev)
      return updated
    })
  }

  const addLinkCategory = (icon, title, subtitle) => {
    const newCat = { id: Date.now().toString(), icon, title, subtitle, links: [] }
    setUsefulLinks(prev => {
      const updated = [...prev, newCat]
      persistLinks(updated, prev)
      return updated
    })
    return newCat.id
  }

  const removeLinkCategory = (catId) => {
    setUsefulLinks(prev => {
      const updated = prev.filter(cat => cat.id !== catId)
      persistLinks(updated, prev)
      return updated
    })
  }

  const removeCategory = (catId) => {
    setServiceContacts(prev => {
      const updated = prev.filter(cat => cat.id !== catId)
      persistContacts(updated, prev)
      return updated
    })
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated, authLoading, login, logout,
      content, contentLoading, updateContent,
      gallery, galleryLoading, addGalleryPhoto, removeGalleryPhoto,
      serviceContacts, contactsLoading, updateContact, addContact, removeContact, addCategory, removeCategory,
      usefulLinks, linksLoading, updateLink, addLink, removeLink, addLinkCategory, removeLinkCategory,
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
