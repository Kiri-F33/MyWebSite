/**
 * =====================================================================
 * 📝 ARQUIVO ÚNICO DE CONFIGURAÇÃO E TEXTOS DO SITE (DUDU ATELIER)
 * =====================================================================
 * Você pode alterar QUALQUER texto, link de rede social, título ou 
 * biografia do site diretamente neste arquivo. Tudo será atualizado 
 * automaticamente em todas as páginas do site!
 */

export const SITE_CONFIG = {
  // 1. INFORMAÇÕES GERAIS DO ARTISTA & ATELIER
  brand: {
    name: 'Dudu Atelier',
    artistName: 'Eduardo (Dudu)',
    role: 'Ilustrador & Fundador do Atelier',
    tagline: 'Desenhos & Diário de Arte',
    email: 'contato.duduatelier@gmail.com',
    copyright: `© ${new Date().getFullYear()} Dudu Atelier. Todos os direitos reservados.`,
  },

  // 2. REDES SOCIAIS E PORTFÓLIOS
  socials: {
    instagram: {
      name: 'Instagram',
      url: 'https://instagram.com/dudu_atelier', // <-- SEU LINK DO INSTAGRAM
      handle: '@dudu_atelier',
    },
    artstation: {
      name: 'ArtStation',
      url: 'https://artstation.com/dudu_art', // <-- SEU LINK DO ARTSTATION
      handle: 'dudu_art',
    },
    behance: {
      name: 'Behance',
      url: 'https://behance.net/dudu_atelier', // <-- SEU LINK DO BEHANCE
      handle: 'dudu_atelier',
    },
    youtube: {
      name: 'YouTube',
      url: 'https://youtube.com/@dudu_atelier', // <-- SEU LINK DO YOUTUBE
      handle: 'Dudu Atelier',
    },
    tiktok: {
      name: 'TikTok',
      url: 'https://tiktok.com/@dudu_atelier', // <-- SEU LINK DO TIKTOK
      handle: '@dudu_atelier',
    },
  },

  // 3. TEXTOS DO BANNER PRINCIPAL (HERO)
  hero: {
    japaneseBadge: 'イラスト // ATELIER',
    title: 'Dudu Atelier',
    description: 'Espaço de ilustração digital, desenhos em mídias tradicionais e estudos de personagens. Explore a galeria ou adicione novas artes.',
    btnExplore: 'Explorar Galeria →',
    btnAddArt: '+ Adicionar Desenho',
    placeholderTitle: 'Seu Desenho Principal',
    placeholderSubtitle: 'Coloque aqui sua ilustração de destaque no futuro!',
  },

  // 4. TEXTOS DA SEÇÃO DE GALERIA
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

  // 5. TEXTOS DO COMPARADOR DE PROCESSO (ANTES / DEPOIS)
  process: {
    sectionBadge: '✦ Interatividade & Bastidores',
    sectionTitle: 'Do Rascunho à Arte Final',
    description: 'Arraste o divisor central para comparar o esboço inicial em grafite/carvão com a renderização digital finalizada.',
    badgeBefore: 'Esboço Inicial (Grafite/Carvão)',
    badgeAfter: 'Arte Final (Render Digital)',
    statTime: 'Tempo estimado de estudo: 14 horas',
    statTechnique: 'Técnica: Carvão vegetal + Pintura Digital no Procreate',
  },

  // 6. TEXTOS DA SEÇÃO DE BLOG & DIÁRIO
  blog: {
    sectionBadge: '✦ Diário de Ateliê',
    sectionTitle: 'Blog, Dicas & Processo Criativo',
    description: 'Artigos sobre o processo de ilustração, hábitos de desenho diário e análises detalhadas de materiais.',
  },

  // 7. TEXTOS DA SEÇÃO "SOBRE O ARTISTA"
  about: {
    sectionBadge: '✦ Sobre o Artista',
    title: 'Ilustração digital e estudos em mídias tradicionais.',
    bioParagraph1: 'Olá! Sou Eduardo, desenhista e ilustrador. Este atelier é o meu acervo pessoal onde compartilho ilustrações originais, cadernos de esboços e o processo de criação passo a passo.',
    bioParagraph2: 'No Dudu Atelier, aceito encomendas de arte personalizada e compartilho ensinamentos para ajudar novos desenhistas.',
    toolsTitle: 'Técnicas & Ferramentas:',
    tools: [
      'iPad Pro + Procreate',
      'Photoshop CS',
      'Lápis Grafite & Carvão',
      'Papel Algodão 300g',
      'Aquarela',
    ],
    stats: [
      { label: 'Autoral', value: '100%' },
      { label: '& Tradicional', value: 'Digital' },
      { label: 'Para Encomendas', value: 'Aberto' },
    ],
  },

  // 8. TEXTOS DA SEÇÃO DE ENCOMENDAS
  commissions: {
    sectionBadge: '✦ Artes Personalizadas',
    sectionTitle: 'Encomende seu Desenho',
    description: 'Peça um desenho sob medida para avatares, presente, personagens ou capas.',
    formTitle: 'Solicitar Orçamento',
    formSubtitle: 'Preencha os detalhes e receba um retorno por e-mail em até 24 horas.',
  },

  // 9. RODAPÉ (FOOTER)
  footer: {
    description: 'Atelier de ilustração digital e estudos em mídias tradicionais. Explore a galeria, acompanhe o blog ou encomende seu desenho sob medida.',
    newsletterTitle: 'Novidades no E-mail',
    newsletterDescription: 'Receba novos lançamentos de desenhos e artigos do blog no seu e-mail.',
  },
};
