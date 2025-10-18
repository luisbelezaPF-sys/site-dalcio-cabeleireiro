'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (credentials.username === 'admin' && credentials.password === 'dalcio26') {
      // Salvar token de autenticação
      localStorage.setItem('admin_token', 'authenticated')
      router.push('/admin/dashboard')
    } else {
      setError('Credenciais inválidas. Tente novamente.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-900 rounded-2xl border border-[#FFD700]/30 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-[#FFD700] mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Dalcio Cabeleireiro</p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Informações de Acesso */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              Acesso restrito apenas para administradores autorizados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}