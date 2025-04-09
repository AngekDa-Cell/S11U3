import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';

const prisma = new PrismaClient();

type PostProps = {
  post: { title: string; content: string; createdAt: Date };
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { slug: params?.slug as string },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};

const Page = ({ post }: PostProps) => {
  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600">{post.content}</div>
      <div className="mt-4 text-sm text-gray-500">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
};

export default Page;
