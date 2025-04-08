import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { title, content } = await request.json();
  
  // Generar un slug único basado en el título
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  try {
    const newPost = await prisma.post.create({
      data: { title, slug, content },
    });
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      // Si el slug ya existe, agregar un número al final
      const existingPost = await prisma.post.findFirst({
        where: { slug },
        select: { id: true }
      });
      
      if (existingPost) {
        let newSlug = `${slug}-1`;
        let counter = 2;
        
        while (await prisma.post.findFirst({ where: { slug: newSlug } })) {
          newSlug = `${slug}-${counter}`;
          counter++;
        }
        
        const newPost = await prisma.post.create({
          data: { title, slug: newSlug, content },
        });
        return new Response(JSON.stringify(newPost), { status: 201 });
      }
    }
    throw error;
  }
}