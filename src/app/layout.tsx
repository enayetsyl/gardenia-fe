import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/Components/Shared/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Gardenia',
  description: 'Your one-stop solution for all your gardening needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: '#2E7D32', 
                color: '#FFFFFF',
                border: '1px solid #000',
                padding: '10px 35px',
              },
              success: {
                style: {
                  background: '#66BB6A', 
                  color: '#FFFFFF',
                },
              },
              error: {
                style: {
                  background: '#FF8F00', 
                  color: '#FFFFFF',
                },
              },
            }}
          />
        </body>
      </StoreProvider>
    </html>
  );
}
