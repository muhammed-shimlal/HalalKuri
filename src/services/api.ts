import { supabase } from '@/lib/supabase'

// Types based on our schema
export type Member = {
  id: string
  member_number: string
  full_name: string
  phone: string | null
  address: string | null
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
}

export type Contribution = {
  id: string
  member_id: string
  month: string
  year: number
  amount: number
  status: 'PAID' | 'PENDING'
  remarks: string | null
  created_at: string
  member?: Member // joined
}

export type Recipient = {
  id: string
  member_id: string
  month: string
  year: number
  amount: number
  reason: string | null
  remarks: string | null
  created_at: string
  member?: Member // joined
}

export type Announcement = {
  id: string
  title: string
  description: string
  published: boolean
  created_at: string
}

export type Document = {
  id: string
  title: string
  file_url: string
  file_name: string
  file_size: number
  created_at: string
}

export type Settings = {
  id: string
  app_name: string
  contact_phone: string
  contact_email: string
  office_address: string
  shared_login_username: string
  admin_username: string
}

export type WebsiteContent = {
  id: string
  page: string
  title: string
  content: string
}

// --- MEMBERS ---
export const getMembers = async () => {
  const { data, error } = await supabase.from('members').select('*').order('member_number')
  if (error) throw error
  return data as Member[]
}
export const addMember = async (member: Omit<Member, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('members').insert(member).select().single()
  if (error) throw error
  return data as Member
}
export const updateMember = async (id: string, updates: Partial<Member>) => {
  const { data, error } = await supabase.from('members').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Member
}
export const deleteMember = async (id: string) => {
  const { error } = await supabase.from('members').delete().eq('id', id)
  if (error) throw error
}

// --- CONTRIBUTIONS ---
export const getContributions = async (month?: string, year?: number) => {
  let query = supabase.from('contributions').select('*, member:members(*)')
  if (month) query = query.eq('month', month)
  if (year) query = query.eq('year', year)
  
  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Contribution[]
}
export const addContribution = async (contribution: Omit<Contribution, 'id' | 'created_at' | 'member'>) => {
  const { data, error } = await supabase.from('contributions').insert(contribution).select().single()
  if (error) throw error
  return data as Contribution
}
export const updateContribution = async (id: string, updates: Partial<Contribution>) => {
  const { data, error } = await supabase.from('contributions').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Contribution
}
export const deleteContribution = async (id: string) => {
  const { error } = await supabase.from('contributions').delete().eq('id', id)
  if (error) throw error
}

// --- RECIPIENTS ---
export const getRecipients = async () => {
  const { data, error } = await supabase.from('recipients').select('*, member:members(*)').order('year', { ascending: false }).order('month', { ascending: false })
  if (error) throw error
  return data as Recipient[]
}
export const addRecipient = async (recipient: Omit<Recipient, 'id' | 'created_at' | 'member'>) => {
  const { data, error } = await supabase.from('recipients').insert(recipient).select().single()
  if (error) throw error
  return data as Recipient
}
export const deleteRecipient = async (id: string) => {
  const { error } = await supabase.from('recipients').delete().eq('id', id)
  if (error) throw error
}

// --- ANNOUNCEMENTS ---
export const getAnnouncements = async (publishedOnly = false) => {
  let query = supabase.from('announcements').select('*')
  if (publishedOnly) {
    query = query.eq('published', true)
  }
  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Announcement[]
}
export const addAnnouncement = async (announcement: Omit<Announcement, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('announcements').insert(announcement).select().single()
  if (error) throw error
  return data as Announcement
}
export const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
  const { data, error } = await supabase.from('announcements').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Announcement
}
export const deleteAnnouncement = async (id: string) => {
  const { error } = await supabase.from('announcements').delete().eq('id', id)
  if (error) throw error
}

// --- DOCUMENTS ---
export const getDocuments = async () => {
  const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Document[]
}
export const addDocument = async (doc: Omit<Document, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('documents').insert(doc).select().single()
  if (error) throw error
  return data as Document
}
export const uploadDocument = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { error } = await supabase.storage.from('documents').upload(fileName, file)
  if (error) throw error
  
  const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(fileName)
  return {
    file_name: fileName,
    file_url: publicUrlData.publicUrl,
    file_size: file.size,
  }
}
export const deleteDocument = async (id: string, file_name: string) => {
  // First delete from storage
  const { error: storageError } = await supabase.storage.from('documents').remove([file_name])
  if (storageError) throw storageError
  
  // Then delete from table
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) throw error
}

// --- SETTINGS ---
export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*').limit(1).single()
  if (error) throw error
  return data as Settings
}
export const updateSettings = async (id: string, updates: Partial<Settings>) => {
  const { data, error } = await supabase.from('settings').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Settings
}

// --- WEBSITE CONTENT ---
export const getWebsiteContent = async (page?: string) => {
  let query = supabase.from('website_content').select('*')
  if (page) query = query.eq('page', page)
  const { data, error } = await query
  if (error) throw error
  return data as WebsiteContent[]
}
export const updateWebsiteContent = async (id: string, updates: Partial<WebsiteContent>) => {
  const { data, error } = await supabase.from('website_content').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as WebsiteContent
}
