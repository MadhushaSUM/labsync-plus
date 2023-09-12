import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./Providers/AuthProvider"
import Navbar from '@/components/Navbar'
import SidePannel from '@/components/SidePannel'
import { SelectedPatientContextProvider } from './context/SelectedPatientContext'
import { NextUIProvider } from '@nextui-org/react'
import LabSync from '@/components/LabSync'

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
            <SelectedPatientContextProvider>
              <LabSync children={children}/>
            </SelectedPatientContextProvider>
          
        </AuthProvider>
      </body>
    </html>
  )
}
