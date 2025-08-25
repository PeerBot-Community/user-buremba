import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)
  const posts = files
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDirectory, file), 'utf8')
      const { data } = matter(source)
      return {
        ...data,
        slug: file.replace('.mdx', ''),
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}

export function getPostBySlug(slug) {
  const source = fs.readFileSync(path.join(postsDirectory, `${slug}.mdx`), 'utf8')
  const { data, content } = matter(source)
  return {
    ...data,
    content,
    slug,
  }
}