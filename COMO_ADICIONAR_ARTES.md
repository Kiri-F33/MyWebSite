# 🎨 Como Adicionar Seus Desenhos e Atualizar Suas Redes Sociais

Este guia rápido explica como você pode adicionar seus próprios desenhos no portfólio e alterar os links das suas redes sociais.

---

## 1. 📷 Alterar Suas Redes Sociais
Todos os links de redes sociais do site estão centralizados no arquivo:
👉 `src/data/socials.ts`

Abra este arquivo e substitua os links pelos seus perfis oficiais (Instagram, ArtStation, Behance, YouTube, TikTok, E-mail).

---

## 2. 🖼️ Adicionar Novos Desenhos (2 Maneiras Rápidas)

### **Maneira 1: Direto pela Interface do Site (Testes e Adição Rápida)**
1. Abra o site no navegador.
2. Na seção **Galeria de Artes**, clique no botão dourado **`✨ Adicionar Novo Desenho / Arte`**.
3. Preencha o título, selecione a categoria, cole o caminho/link da imagem e clique em salvar.
4. O desenho aparecerá instantaneamente na galeria!

---

### **Maneira 2: De Forma Permanente no Código (Recomendado)**

1. **Guarde sua Imagem**:
   Copie seu arquivo de imagem para a pasta `public/images/` do projeto.
   - *Exemplo*: `public/images/meu_desenho_novo.png`

2. **Abra o Arquivo de Dados**:
   Abra o arquivo 👉 `src/data/artworks.ts`

3. **Adicione um Novo Bloco**:
   Copie e cole este modelo dentro da lista `ARTWORKS_DATA`:

```typescript
{
  id: 'meu-desenho-novo',
  title: 'Título do Seu Desenho',
  category: 'digital', // Opções: 'digital', 'traditional', 'sketchbook', 'concept'
  categoryName: 'Arte Digital',
  year: 2026,
  medium: 'Pintura Digital no Procreate',
  dimensions: '3000 x 4000 px',
  description: 'Uma breve descrição sobre a ideia e o estilo do seu desenho.',
  story: 'Explique como você criou essa arte, o que te inspirou ou quanto tempo levou.',
  imageUrl: '/images/meu_desenho_novo.png',
  featured: false,
  tags: ['Digital', 'Ilustração', 'Personagem']
},
```

Salve o arquivo e a sua nova arte estará salva permanentemente no seu site!
