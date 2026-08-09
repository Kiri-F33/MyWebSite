import { BlogPost, CommissionPackage } from '@/types';

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'do-esboco-a-arte-final',
    title: 'Do Esboço à Arte Final: Meu Processo Criativo Passo a Passo',
    slug: 'do-esboco-a-arte-final',
    summary: 'Um mergulho detalhado em todas as etapas de criação de uma ilustração digital profissional, desde a ideia inicial no papel até a renderização e ajuste de cor.',
    content: [
      'Todo desenho começa com uma pergunta ou um sentimento. No meu atelier, evito ir direto para o software sem antes colocar algumas linhas despretensiosas no papel.',
      '### 1. A Etapa de Thumbnail (Miniaturas) e Rascunho',
      'Nos primeiros minutos, não me preocupo com detalhes anatômicos ou linhas perfeitas. O foco é a **composição** e os grandes blocos de forma. Desenho em miniaturas de 5x5 cm para entender onde a iluminação principal vai incidir.',
      '### 2. Lineart e Limpeza do Traço',
      'Quando migro para a mesa digitalizadora, crio uma camada de rascunho azul com opacidade reduzida. A linha final precisa ser dinâmica: traços mais grossos em áreas de sombra e traços mais finos onde a luz bate.',
      '### 3. Blocagem de Cores e Iluminação',
      'Defino a paleta de cores base (Flat Colors) antes de aplicar qualquer gradiente. Em seguida, uso camadas em modo de mesclagem como *Multiply* para sombras e *Color Dodge / Add Glow* para os brilhos de destaque.',
      'Manter um diário visual e revisar constantemente seus próprios esboços é o maior segredo para evolução constante.'
    ],
    date: '04 de Agosto, 2026',
    readTime: '6 min de leitura',
    category: 'Processo Criativo',
    coverImage: '',
    author: {
      name: 'Artista',
      avatar: '',
      role: 'Ilustrador & Fundador do Atelier'
    },
    tags: ['Ilustração', 'Procreate', 'Dicas de Desenho', 'Tutorial']
  },
  {
    id: 'guia-materiais-desenho-tradicional',
    title: 'Guia Prático de Materiais: O que usar no Desenho Tradicional?',
    slug: 'guia-materiais-desenho-tradicional',
    summary: 'Minhas recomendações de lápis grafite, tipos de papel, esfuminhos e carvão vegetal para quem deseja dominar a técnica de luz e sombra.',
    content: [
      'Apesar do avanço das mídias digitais, o contato tátil do grafite deslizando sobre a textura do papel continua sendo insubstituível.',
      '### Grafites: Das Graduações H aos B',
      'Se você está começando, não precisa de uma caixa com 24 lápis. Três graduações são suficientes para quase tudo: **2H** para esboços leves, **2B** para linhas gerais e **6B/8B** para as sombras mais profundas.',
      '### O Papel Faz Toda a Diferença',
      'Evite papéis muito finos de impressora se pretende trabalhar com camadas espessas de sombra. Um papel com gramatura a partir de 180g/m² e leve textura dá aderência ao pigmento do carvão.'
    ],
    date: '28 de Julho, 2026',
    readTime: '4 min de leitura',
    category: 'Materiais & Equipamentos',
    coverImage: '',
    author: {
      name: 'Artista',
      avatar: '',
      role: 'Ilustrador & Fundador do Atelier'
    },
    tags: ['Tradicional', 'Grafite', 'Materiais', 'Dicas']
  },
  {
    id: 'habito-do-sketchbook',
    title: 'Como Vencer o Bloqueio Criativo com o Caderno de Esboços',
    slug: 'habito-do-sketchbook',
    summary: 'Por que o sketchbook deve ser um ambiente de experimentos sem julgamentos e como desenhar 15 minutos por dia muda seu traço.',
    content: [
      'O maior inimigo do artista é a folha em branco combinada com o perfeccionismo. O caderno de esboços existe para ser errático, rabiscado e vivo.',
      '### Dica de Ouro: Permita-se Fazer Desenhos Feios',
      'Quando aceitamos que nem todo desenho precisa virar uma obra de arte pronta para o portfólio, a pressão desaparece e a criatividade volta a fluir naturally.'
    ],
    date: '15 de Julho, 2026',
    readTime: '5 min de leitura',
    category: 'Reflexões & Rotina',
    coverImage: '',
    author: {
      name: 'Artista',
      avatar: '',
      role: 'Ilustrador & Fundador do Atelier'
    },
    tags: ['Sketchbook', 'Rotina', 'Inspiração']
  }
];

export const COMMISSION_PACKAGES: CommissionPackage[] = [
  {
    id: 'busto',
    title: 'Retrato / Busto',
    description: 'Ilustração focada do rosto até os ombros. Ideal para avatares, capas de perfil ou presentes personalizados.',
    startingPrice: 'R$ 150',
    deliveryTime: '3 a 5 dias úteis',
    features: [
      'Alta resolução (4000px, 300 DPI)',
      'Arte Digital ou Grafite Tradicional',
      'Incluso 2 rodadas de revisões de esboço',
      'Arquivo final em PNG / JPG'
    ],
    popular: false
  },
  {
    id: 'corpo-inteiro',
    title: 'Personagem Completo',
    description: 'Ilustração de corpo inteiro de personagem original, D&D, fanart ou retrato estilizado com fundo simples.',
    startingPrice: 'R$ 280',
    deliveryTime: '5 a 8 dias úteis',
    features: [
      'Design detalhado de vestuário e acessórios',
      'Fundo com gradiente ou ambiente sutil',
      'Incluso arquivo de processo (Passo a passo)',
      'Uso Pessoal ou Comercial sob consulta'
    ],
    popular: true
  },
  {
    id: 'cenario-ilustracao',
    title: 'Cenário & Composição',
    description: 'Obra completa com personagens integrados em ambiente complexo, iluminação dramática e riqueza de detalhes.',
    startingPrice: 'R$ 450',
    deliveryTime: '8 a 14 dias úteis',
    features: [
      'Estudo de iluminação e atmosfera personalizada',
      'Ficha de cores e variações de luz',
      'Licença comercial inclusa',
      'Formato pronto para impressão em alta qualidade'
    ],
    popular: false
  }
];
