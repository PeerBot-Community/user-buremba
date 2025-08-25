import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const posts = getAllPosts()
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">
              <a href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-gray-500 text-sm">{post.date}</time>
          </article>
        ))}
      </div>
    </main>
  )
}