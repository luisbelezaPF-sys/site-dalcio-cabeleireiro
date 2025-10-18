'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LogOut, 
  Upload, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Save,
  Eye,
  Settings,
  Home
} from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  alt: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newImageAlt, setNewImageAlt] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token === 'authenticated') {
      setIsAuthenticated(true)
      loadGalleryImages()
    } else {
      router.push('/admin')
    }
  }, [router])

  // Carregar imagens da galeria do localStorage
  const loadGalleryImages = () => {
    const savedImages = localStorage.getItem('gallery_images')
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages))
    } else {
      // Imagens padrão
      const defaultImages: GalleryImage[] = [
        { id: '1', url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop', alt: 'Trabalho 1' },
        { id: '2', url: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&h=400&fit=crop', alt: 'Trabalho 2' },
        { id: '3', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop', alt: 'Trabalho 3' },
        { id: '4', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop', alt: 'Trabalho 4' },
        { id: '5', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop', alt: 'Trabalho 5' },
        { id: '6', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop', alt: 'Trabalho 6' },
        { id: '7', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', alt: 'Trabalho 7' },
        { id: '8', url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop', alt: 'Trabalho 8' },
        { id: '9', url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop', alt: 'Trabalho 9' }
      ]
      setGalleryImages(defaultImages)
      localStorage.setItem('gallery_images', JSON.stringify(defaultImages))
    }
  }

  // Salvar imagens no localStorage
  const saveGalleryImages = (images: GalleryImage[]) => {
    localStorage.setItem('gallery_images', JSON.stringify(images))
    setGalleryImages(images)
  }

  // Adicionar nova imagem
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImageUrl.trim()) return

    setLoading(true)
    
    try {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || 'Novo trabalho'
      }

      const updatedImages = [...galleryImages, newImage]
      saveGalleryImages(updatedImages)
      
      setNewImageUrl('')
      setNewImageAlt('')
      setMessage('Imagem adicionada com sucesso!')
      
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Erro ao adicionar imagem. Tente novamente.')
    }
    
    setLoading(false)
  }

  // Remover imagem
  const handleRemoveImage = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta imagem?')) {
      const updatedImages = galleryImages.filter(img => img.id !== id)
      saveGalleryImages(updatedImages)
      setMessage('Imagem removida com sucesso!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  // Voltar ao site
  const goToSite = () => {
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Verificando autenticação...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-[#FFD700]/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Settings className="text-[#FFD700]" size={24} />
            <h1 className="text-xl font-bold text-[#FFD700]">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={goToSite}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Home size={16} />
              <span>Ver Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Mensagem de Feedback */}
        {message && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg">
            <p className="text-green-400">{message}</p>
          </div>
        )}

        {/* Seção: Gerenciar Galeria */}
        <div className="bg-gray-900 rounded-2xl border border-[#FFD700]/30 p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6 flex items-center">
            <ImageIcon className="mr-3" size={24} />
            Gerenciar Galeria - Meus Trabalhos
          </h2>

          {/* Formulário para Adicionar Imagem */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Adicionar Nova Imagem</h3>
            
            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">URL da Imagem</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  Cole aqui o link direto da imagem (ex: Unsplash, Google Drive público, etc.)
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Descrição (opcional)</label>
                <input
                  type="text"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none"
                  placeholder="Descrição do trabalho"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-[#FFD700] hover:bg-[#FFD700]/80 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                <Plus size={16} />
                <span>{loading ? 'Adicionando...' : 'Adicionar Imagem'}</span>
              </button>
            </form>
          </div>

          {/* Grid de Imagens Atuais */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Imagens Atuais ({galleryImages.length})
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-700 group-hover:border-[#FFD700] transition-colors">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/400x400/333/fff?text=Erro+ao+Carregar'
                      }}
                    />
                  </div>
                  
                  {/* Overlay com Ações */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <button
                      onClick={() => window.open(image.url, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                      title="Remover"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-400 text-sm mt-2 truncate">{image.alt}</p>
                </div>
              ))}
            </div>

            {galleryImages.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">Nenhuma imagem na galeria</p>
              </div>
            )}
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-gray-900 rounded-2xl border border-[#FFD700]/30 p-6">
          <h3 className="text-lg font-semibold text-[#FFD700] mb-4">Como usar:</h3>
          <div className="space-y-2 text-gray-300">
            <p>• Para adicionar imagens, cole o link direto da imagem no campo URL</p>
            <p>• Use serviços como Unsplash, Imgur ou Google Drive (links públicos)</p>
            <p>• As imagens aparecerão automaticamente na seção "Nossos Trabalhos" do site</p>
            <p>• Para remover uma imagem, passe o mouse sobre ela e clique no ícone da lixeira</p>
            <p>• As alterações são salvas automaticamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}