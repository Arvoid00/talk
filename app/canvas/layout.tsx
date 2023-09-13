import './draw.css'

export const metadata = {
  title: 'smol canvas',
  description: 'A small canvas for smoltalk'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
