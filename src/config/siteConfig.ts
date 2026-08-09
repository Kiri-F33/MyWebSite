/**
 * =====================================================================
 * 📝 ARQUIVO ÚNICO DE CONFIGURAÇÃO E TEXTOS DO SITE
 * =====================================================================
 * Você pode alterar QUALQUER texto, link de rede social, título ou 
 * biografia do site diretamente neste arquivo. Tudo será atualizado 
 * automaticamente em todas as páginas do site!
 */

export const SITE_CONFIG = {
  // 1. INFORMAÇÕES GERAIS DO ARTISTA & ATELIER
  brand: {
    name: 'Atelier de Artes',
    artistName: 'Kiri',
    role: 'Ilustrador & Criador do Atelier',
    tagline: 'Desenhos, Galeria em Bolhas & Diário de Arte',
    email: 'contato@seuatelier.com',
    copyright: `© ${new Date().getFullYear()} Atelier de Artes. Todos os direitos reservados.`,
  },

  // 2. REDES SOCIAIS E PORTFÓLIOS
  socials: {
    github: {
      name: 'GitHub',
      url: 'https://github.com/Kiri-F33',
      handle: 'Kiri-F33',
    },
    instagram: {
      name: 'Instagram',
      url: 'https://instagram.com/seu_atelier', // <-- SEU LINK DO INSTAGRAM
      handle: '@seu_atelier',
    },
    artstation: {
      name: 'ArtStation',
      url: 'https://artstation.com/seu_atelier', // <-- SEU LINK DO ARTSTATION
      handle: 'seu_atelier',
    },
    behance: {
      name: 'Behance',
      url: 'https://behance.net/seu_atelier', // <-- SEU LINK DO BEHANCE
      handle: 'seu_atelier',
    },
    youtube: {
      name: 'YouTube',
      url: 'https://youtube.com/@seu_atelier', // <-- SEU LINK DO YOUTUBE
      handle: 'Atelier de Artes',
    },
    tiktok: {
      name: 'TikTok',
      url: 'https://tiktok.com/@seu_atelier', // <-- SEU LINK DO TIKTOK
      handle: '@seu_atelier',
    },
  },

  // 3. TEXTOS DO BANNER PRINCIPAL (HERO ATMOSFÉRICO)
  hero: {
    badge: '✦ ATELIER ILUSTRADO & BOLHAS CRIATIVAS',
    japaneseBadge: 'イラスト // ATELIER',
    title: 'Parque de Artes & Ilustração',
    subtitle: 'Explore desenhos digitais, artes tradicionais em grafite e estudos em um ambiente lúdico e atmosférico.',
    description: 'Explore desenhos digitais, artes tradicionais em grafite e estudos em um ambiente lúdico e atmosférico.',
    btnExplore: 'Explorar Galeria',
    btnAddArt: '+ Adicionar Desenho',
    placeholderTitle: 'Seu Desenho Principal',
    placeholderSubtitle: 'Ilustração de destaque no futuro!',
  },

  // 4. CARDS DE CATEGORIAS ("O que encontrar no Atelier")
  categoriesSection: {
    title: 'O que encontrar no Atelier',
    description: 'Navegue pelas diferentes modalidades de arte criada no studio com acentos em Verde Menta, Coral e Azul Céu.',
    btnViewAll: 'Ver Todas as Obras',
    cards: [
      {
        id: 'digital',
        title: 'Arte Digital',
        desc: 'Pinturas digitais com iluminação vibrante e conceito.',
        colorBg: 'bg-[#FCA5A5]/25 border-[#FCA5A5]/40 text-[#EF4444]',
        btnBg: 'bg-[#FCA5A5] text-white',
        icon: '🎨',
      },
      {
        id: 'traditional',
        title: 'Estudos Tradicionais',
        desc: 'Desenhos em carvão vegetal, grafite 6B e aquarela.',
        colorBg: 'bg-[#80A1D4]/25 border-[#80A1D4]/40 text-[#3B82F6]',
        btnBg: 'bg-[#80A1D4] text-white',
        icon: '✏️',
      },
      {
        id: 'sketchbook',
        title: 'Caderno de Esboços',
        desc: 'Estudos diários de anatomia, gestual e soltura do traço.',
        colorBg: 'bg-[#34D399]/25 border-[#34D399]/40 text-[#10B981]',
        btnBg: 'bg-[#10B981] text-white',
        icon: '🌱',
      },
    ],
  },

  // 5. TEXTOS DA GALERIA EM BOLHAS
  bubbleGallery: {
    sectionBadge: '🫧 Galeria Flutuante',
    sectionTitle: 'Mundo de Ilustrações',
    description: 'Clique nas bolhas de artes para visualizar os detalhes completos de cada desenho em alta resolução.',
    btnLoadMore: 'Ver Mais Obras',
  },

  // 6. TEXTOS DA SEÇÃO DE GALERIA PADRÃO
  gallery: {
    sectionBadge: 'Acervo do Atelier',
    sectionTitle: 'Galeria de Desenhos & Ilustrações',
    description: 'Explore trabalhos que transitam entre mídias tradicionais como carvão e aquarela até a pintura digital avançada.',
    btnAddArt: '+ Adicionar Sua Arte',
    categories: {
      all: 'Todas as Obras',
      digital: 'Arte Digital',
      traditional: 'Tradicional (Grafite/Carvão)',
      sketchbook: 'Caderno de Esboços',
      concept: 'Concept Art',
    },
  },

  // 7. TEXTOS DO COMPARADOR DE PROCESSO (ANTES / DEPOIS)
  process: {
    sectionBadge: '✦ Interatividade & Bastidores',
    sectionTitle: 'Do Rascunho à Arte Final',
    description: 'Arraste o divisor central para comparar o esboço inicial em grafite/carvão com a renderização digital finalizada.',
    badgeBefore: 'Esboço Inicial (Grafite/Carvão)',
    badgeAfter: 'Arte Final (Render Digital)',
    statTime: 'Tempo estimado de estudo: 14 horas',
    statTechnique: 'Técnica: Carvão vegetal + Pintura Digital no Clip Studio',
  },

  // 8. TEXTOS DA SEÇÃO DE BLOG & DIÁRIO
  blog: {
    sectionBadge: '✦ Diário de Ateliê',
    sectionTitle: 'Eventos & Novidades do Blog',
    description: 'Artigos sobre o processo de ilustração, hábitos de desenho diário e análises detalhadas de materiais.',
  },

  // 9. TEXTOS DA SEÇÃO "SOBRE O ARTISTA"
  about: {
    sectionBadge: '✦ Sobre o Atelier',
    title: 'Ilustração digital e estudos em mídias tradicionais.',
    bioParagraph1: 'Olá! Seja bem-vindo ao meu atelier de ilustrações. Este é o meu acervo pessoal onde compartilho ilustrações originais, cadernos de esboços e o processo de criação passo a passo.',
    bioParagraph2: 'Aqui no atelier, aceito encomendas de arte personalizada e compartilho ensinamentos para ajudar novos desenhistas.',
    toolsTitle: 'Técnicas & Ferramentas:',
    tools: [
      'Clip Studio Paint',
    ],
    stats: [
      { label: 'Autoral', value: '100%' },
      { label: '& Tradicional', value: 'Digital' },
      { label: 'Para Encomendas', value: 'Aberto' },
    ],
  },

  // 10. TEXTOS DA SEÇÃO DE ENCOMENDAS
  commissions: {
    sectionBadge: '✦ Artes Personalizadas',
    sectionTitle: 'Encomende seu Desenho',
    description: 'Peça um desenho sob medida para avatares, presente, personagens ou capas.',
    formTitle: 'Solicitar Orçamento',
    formSubtitle: 'Preencha os detalhes e receba um retorno por e-mail em até 24 horas.',
  },

  // 11. RODAPÉ (FOOTER E MAPA)
  footer: {
    locationTitle: 'Esperamos por você!',
    locationDesc: 'Atelier de ilustração digital e produções autorais.',
    description: 'Atelier de ilustração digital e estudos em mídias tradicionais. Explore a galeria, acompanhe o blog ou encomende seu desenho sob medida.',
    newsletterTitle: 'Novidades no E-mail',
    newsletterDescription: 'Receba novos lançamentos de desenhos e artigos do blog no seu e-mail.',
  },
};
