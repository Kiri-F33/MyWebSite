export type ArtworkCategory = 'all' | 'digital' | 'traditional' | 'sketchbook' | 'concept';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  categoryName: string;
  year: number;
  medium: string; // e.g. "Pintura Digital (Procreate)", "Lápis Grafite & Carvão", "Aquarela & Nanquim"
  dimensions?: string;
  description: string;
  story: string;
  imageUrl: string;
  draftImageUrl?: string; // For process comparison slider
  featured?: boolean;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}

export interface CommissionPackage {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
}
