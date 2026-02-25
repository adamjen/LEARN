import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * MainLayout Component
 * 
 * Provides a consistent layout structure with header and mobile sidebar navigation.
 * Wraps page content with common layout elements.
 * 
 * @param {ReactNode} children - Child components to render
 * @component
 */
interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop Header */}
      <Header />
      
      {/* Mobile Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;