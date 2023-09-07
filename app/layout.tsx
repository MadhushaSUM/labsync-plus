import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./Providers/AuthProvider"
import Navbar from '@/components/Navbar'
import SidePannel from '@/components/SidePannel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LabSync Plus',
  description: 'MediLab Manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className='flex flex-row'>
            <div>
              <SidePannel />
            </div>

            <div className='flex-1'>
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
