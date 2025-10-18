'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Phone, Clock, Instagram, Facebook, Star, Menu, X, MessageCircle } from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  alt: string
}

export default function DalcioCabeleireiro() {
  const [currentSlide, setCurrentSlide] = useState({
    hero: 0,
    services: 0,
    gallery: 0,
    about: 0,
    testimonials: 0,
    contact: 0
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  // Carregar imagens da galeria do localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('gallery_images')
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages))
    } else {
      // Imagens padrão se não houver no localStorage
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
    }
  }, [])

  // Imagens para cada seção
  const heroImages = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=800&fit=crop'
  ]

  const servicesImages = [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&h=800&fit=crop'
  ]

  const galleryBgImages = [
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop'
  ]

  const aboutImages = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=800&fit=crop'
  ]

  const testimonialsImages = [
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&h=800&fit=crop'
  ]

  const contactImages = [
    'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop'
  ]

  // Auto-advance carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => ({
        hero: (prev.hero + 1) % heroImages.length,
        services: (prev.services + 1) % servicesImages.length,
        gallery: (prev.gallery + 1) % galleryBgImages.length,
        about: (prev.about + 1) % aboutImages.length,
        testimonials: (prev.testimonials + 1) % testimonialsImages.length,
        contact: (prev.contact + 1) % contactImages.length
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = (section: string, images: string[]) => {
    setCurrentSlide(prev => ({
      ...prev,
      [section]: (prev[section as keyof typeof prev] + 1) % images.length
    }))
  }

  const prevSlide = (section: string, images: string[]) => {
    setCurrentSlide(prev => ({
      ...prev,
      [section]: prev[section as keyof typeof prev] === 0 ? images.length - 1 : prev[section as keyof typeof prev] - 1
    }))
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const whatsappNumber = "5535999501735"
  const whatsappMessage = "Olá! Gostaria de agendar um horário no Dalcio Cabeleireiro."

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black z-50 border-b border-[#FFD700]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e Nome */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#FFD700] overflow-hidden shadow-2xl">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/173772a4-0e22-4a80-9bd0-681f7f10ed5c.jpg" 
                  alt="Dalcio Cabeleireiro" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#FFD700]">Dalcio Cabeleireiro</h1>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-[#FFD700] transition-colors">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-[#FFD700] transition-colors">Serviços</button>
              <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-[#FFD700] transition-colors">Galeria</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#FFD700] transition-colors">Sobre Nós</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-white hover:text-[#FFD700] transition-colors">Depoimentos</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-[#FFD700] transition-colors">Contato</button>
            </nav>

            {/* Botão WhatsApp Desktop */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-[#FF69B4] hover:bg-[#FF69B4]/80 text-white px-6 py-2 rounded-full transition-colors"
            >
              Agende pelo WhatsApp
            </a>

            {/* Menu Mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#FFD700]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menu Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-[#FFD700]/20">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-white hover:text-[#FFD700] transition-colors text-left">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-white hover:text-[#FFD700] transition-colors text-left">Serviços</button>
                <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-[#FFD700] transition-colors text-left">Galeria</button>
                <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#FFD700] transition-colors text-left">Sobre Nós</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-white hover:text-[#FFD700] transition-colors text-left">Depoimentos</button>
                <button onClick={() => scrollToSection('contact')} className="text-white hover:text-[#FFD700] transition-colors text-left">Contato</button>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF69B4] hover:bg-[#FF69B4]/80 text-white px-6 py-2 rounded-full transition-colors text-center"
                >
                  Agende pelo WhatsApp
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Banner Principal */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.hero ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-bold text-[#FFD700] mb-6" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.3)' }}>
              25 anos realçando sua beleza
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Especialista em penteados para noivas e tratamentos exclusivos para mulheres
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF69B4] hover:bg-[#FF69B4]/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              Agende pelo WhatsApp
            </a>
          </div>
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('hero', heroImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('hero', heroImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Seção de Serviços */}
      <section id="services" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {servicesImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.services ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Services ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] text-center mb-16">Nossos Serviços</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Cortes Modernos', desc: 'Cortes personalizados seguindo as últimas tendências da moda' },
              { title: 'Penteados para Noivas', desc: 'Penteados exclusivos para o dia mais especial da sua vida' },
              { title: 'Coloração e Mechas', desc: 'Técnicas avançadas de coloração com produtos de alta qualidade' },
              { title: 'Tratamentos Capilares', desc: 'Tratamentos profissionais para revitalizar e nutrir seus cabelos' },
              { title: 'Maquiagem Exclusiva', desc: 'Maquiagem profissional para eventos especiais e ocasiões únicas' },
              { title: 'Escova e Finalização', desc: 'Escova modeladora e finalizações impecáveis para qualquer ocasião' }
            ].map((service, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">{service.title}</h3>
                <p className="text-white">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('services', servicesImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('services', servicesImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Galeria de Trabalhos */}
      <section id="gallery" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {galleryBgImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.gallery ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] text-center mb-16">Nossos Trabalhos</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-lg border-2 border-[#FFD700]/50 hover:border-[#FFD700] transition-colors">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/400x400/333/fff?text=Imagem+Indisponível'
                  }}
                />
              </div>
            ))}
          </div>

          {galleryImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhuma imagem na galeria</p>
            </div>
          )}
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('gallery', galleryBgImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('gallery', galleryBgImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Sobre Nós */}
      <section id="about" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {aboutImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.about ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`About ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] text-center mb-16">Nossa História</h2>
            
            <div className="bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[#FFD700]/30">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                Há 25 anos, Dalcio iniciou sua jornada no mundo da beleza com um sonho: realçar a beleza natural de cada mulher. 
                Com dedicação, estudo constante e paixão pelo que faz, construiu um salão que se tornou referência na região.
              </p>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                Especializado em penteados para noivas, Dalcio e sua equipe já fizeram parte de centenas de casamentos, 
                criando looks únicos e inesquecíveis para o dia mais especial da vida de suas clientes.
              </p>
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Nossa missão é proporcionar uma experiência única de beleza e bem-estar, utilizando as melhores técnicas 
                e produtos do mercado, sempre com o carinho e atenção que cada cliente merece.
              </p>
            </div>
          </div>
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('about', aboutImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('about', aboutImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Depoimentos */}
      <section id="testimonials" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {testimonialsImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.testimonials ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Testimonials ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] text-center mb-16">O que dizem nossas clientes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { text: "Meu casamento foi perfeito graças ao Dalcio e sua equipe! O penteado ficou exatamente como eu sonhava.", author: "Mariana S." },
              { text: "Há anos faço meus cortes e tratamentos aqui. Atendimento impecável e resultado sempre surpreendente!", author: "Ana P." },
              { text: "Profissionais excepcionais! Sempre saio de lá me sentindo renovada e linda. Recomendo de olhos fechados!", author: "Carla M." },
              { text: "O Dalcio tem um talento único. Transformou completamente meu visual e minha autoestima. Gratidão eterna!", author: "Juliana R." },
              { text: "Ambiente acolhedor, equipe atenciosa e resultado impecável. Não troco este salão por nenhum outro!", author: "Patricia L." },
              { text: "Para minha formatura, o penteado ficou perfeito! Recebi elogios o dia todo. Obrigada pela dedicação!", author: "Fernanda C." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-[#FFD700]/30">
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-[#FFD700] fill-current" />
                  ))}
                </div>
                <p className="text-white text-lg mb-4 italic">
                  <span className="text-[#FF69B4] text-2xl">"</span>
                  {testimonial.text}
                  <span className="text-[#FF69B4] text-2xl">"</span>
                </p>
                <p className="text-[#FFD700] font-semibold">– {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('testimonials', testimonialsImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('testimonials', testimonialsImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Agendamento e Contato */}
      <section id="contact" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {contactImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide.contact ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Contact ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] text-center mb-8">Agendamento e Contato</h2>
          <p className="text-white text-xl text-center mb-16 max-w-3xl mx-auto">
            Agende seu horário com facilidade pelo WhatsApp ou formulário abaixo
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informações de Contato */}
            <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-[#FFD700]/30">
              <h3 className="text-2xl font-bold text-[#FFD700] mb-6">Entre em Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="text-[#FF69B4]" size={24} />
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-white">+55 35 99950-1735</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <MessageCircle className="text-[#FF69B4]" size={24} />
                  <div>
                    <p className="text-white font-semibold">Conceição de Aparecida</p>
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#FFD700] transition-colors font-medium flex items-center space-x-1"
                    >
                      <span>Agendar pelo WhatsApp</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Clock className="text-[#FF69B4]" size={24} />
                  <div>
                    <p className="text-white font-semibold">Horário de Funcionamento</p>
                    <p className="text-white">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 16h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF69B4] hover:bg-[#FF69B4]/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Agendar pelo WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-[#FFD700]/30">
              <h3 className="text-2xl font-bold text-[#FFD700] mb-6">Formulário de Agendamento</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white/10 border border-[#FFD700]/30 rounded-lg text-white placeholder-white/60 focus:border-[#FFD700] focus:outline-none"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 bg-white/10 border border-[#FFD700]/30 rounded-lg text-white placeholder-white/60 focus:border-[#FFD700] focus:outline-none"
                    placeholder="(35) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Serviço Desejado</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-[#FFD700]/30 rounded-lg text-white focus:border-[#FFD700] focus:outline-none">
                    <option value="">Selecione um serviço</option>
                    <option value="corte">Corte</option>
                    <option value="penteado-noiva">Penteado para Noiva</option>
                    <option value="coloracao">Coloração e Mechas</option>
                    <option value="tratamento">Tratamento Capilar</option>
                    <option value="maquiagem">Maquiagem</option>
                    <option value="escova">Escova e Finalização</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Data Preferida</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-white/10 border border-[#FFD700]/30 rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#FF69B4] hover:bg-[#FF69B4]/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
                >
                  Enviar Solicitação
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Controles do Carrossel */}
        <button 
          onClick={() => prevSlide('contact', contactImages)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => nextSlide('contact', contactImages)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#FFD700] p-2 rounded-full transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#FFD700]/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo e Descrição */}
            <div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Dalcio Cabeleireiro</h3>
              <p className="text-white mb-4">
                25 anos de experiência realçando a beleza natural de cada mulher com carinho e profissionalismo.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#FF69B4] hover:text-[#FFD700] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-[#FF69B4] hover:text-[#FFD700] transition-colors">
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            {/* Informações de Contato */}
            <div>
              <h4 className="text-xl font-bold text-[#FFD700] mb-4">Contato</h4>
              <div className="space-y-2 text-white">
                <p>📱 +55 35 99950-1735</p>
                <p className="flex items-center space-x-2">
                  <MessageCircle size={16} className="text-[#25D366]" />
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:text-[#FFD700] transition-colors"
                  >
                    Conceição de Aparecida - Agendar WhatsApp
                  </a>
                </p>
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div>
              <h4 className="text-xl font-bold text-[#FFD700] mb-4">Horário de Funcionamento</h4>
              <div className="space-y-2 text-white">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 16h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#FFD700]/20 mt-8 pt-8 text-center">
            <p className="text-white">
              © 2024 Dalcio Cabeleireiro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}