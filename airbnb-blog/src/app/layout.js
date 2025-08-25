export const metadata = {
  title: 'Airbnb Blog',
  description: 'Blog powered by Next.js and MDX',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}