import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
                Blog
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/new" className="text-gray-600 hover:text-gray-900">
                New Post
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <nav className="space-y-2">
                <Link href="/category/tech" className="block text-gray-600 hover:text-gray-900">
                  Technology
                </Link>
                <Link href="/category/life" className="block text-gray-600 hover:text-gray-900">
                  Lifestyle
                </Link>
                <Link href="/category/news" className="block text-gray-600 hover:text-gray-900">
                  News
                </Link>
              </nav>
            </div>
          </aside>

          {/* Posts */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-6">
                    <Link href={`/${post.slug}`} className="block">
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-gray-600">{post.content.substring(0, 150)}...</p>
                    </Link>
                    <div className="mt-4">
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Blog. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-sm hover:text-gray-300">
                Privacy
              </a>
              <a href="/terms" className="text-sm hover:text-gray-300">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}