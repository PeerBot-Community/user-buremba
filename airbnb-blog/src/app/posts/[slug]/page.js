import { getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Post({ params }) {
  const post = getPostBySlug(params.slug)
  
  return (
    <article className="container mx-auto px-4 py-8 prose prose-lg">
      <h1>{post.title}</h1>
      <time className="text-gray-500">{post.date}</time>
      <MDXRemote source={post.content} />
    </article>
  )
}