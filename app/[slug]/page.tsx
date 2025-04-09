// app/[slug]/page.tsx

import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

// Generación de metadatos, asegurándonos de que el tipo de los parámetros sea correcto
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post) return { title: 'Post not found' };

  return { title: post.title };
}

// Asegúrate de que la definición de props sea compatible con Next.js
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post) return notFound(); // mejor UX

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

