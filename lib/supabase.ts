import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email?: string
  created_at: string
  updated_at: string
}

export interface FocusSession {
  id: string
  user_id: string
  duration: number
  completed: boolean
  created_at: string
  session_type: 'focus' | 'break'
}

export interface Task {
  id: string
  user_id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

export interface ColoringPage {
  id: string
  user_id: string
  title: string
  image_url: string
  difficulty: 'easy' | 'medium' | 'hard'
  is_favorite: boolean
  created_at: string
  completed_at?: string
}

// Database functions
export const saveFocusSession = async (session: Omit<FocusSession, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('focus_sessions')
    .insert([session])
    .select()
  
  if (error) throw error
  return data[0]
}

export const getUserFocusSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const saveTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
  
  if (error) throw error
  return data[0]
}

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

export const getUserTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const saveColoringPage = async (page: Omit<ColoringPage, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('coloring_pages')
    .insert([page])
    .select()
  
  if (error) throw error
  return data[0]
}

export const getUserColoringPages = async (userId: string) => {
  const { data, error } = await supabase
    .from('coloring_pages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
