import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/navbar'
import Info from '@/components/info/info'
import { ApolloClientWrapper } from '../lib/apollo-client-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Misha blog',
  description: 'blog deadass',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientWrapper>
          <div className='flex items-center justify-center flex-col my-20'>
            <Info />
            <Navbar />
            <div className='max-w-screen-lg my-4'>
              {children}
            </div>
          </div>
        </ApolloClientWrapper>
      </body>
    </html>
  )
}
