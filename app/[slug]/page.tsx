import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  return {
    title: post?.title || 'Post not found',
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;

  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return <div>Post not found</div>;

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
