import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function PostPage({ params }: { params: { slug: string } }) {
  // Desestructuramos params sin usar await, ya que params no es una promesa
  const { slug } = params;

  // Buscamos el post usando el slug
  const post = await prisma.post.findUnique({ where: { slug } });

  // Si no encontramos el post, mostramos un mensaje
  if (!post) return <div>Post not found</div>;

  // Renderizamos el contenido del post
  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600">{post.content}</div>
      <div className="mt-4 text-sm text-gray-500">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}
