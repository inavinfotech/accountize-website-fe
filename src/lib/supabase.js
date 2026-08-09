// Zero-dependency Supabase RPC fetch helper using native fetch API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://skzsbeztpwuznxylibcf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrenNiZXp0cHd1em54eWxpYmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NjIyNjksImV4cCI6MjA5NjEzODI2OX0.GD5PUHbwZP9S6Bef8JLzm1lLruou8GuF8YlAjaMbWcI'

export const supabase = {
  rpc: async (functionName) => {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      })
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}
