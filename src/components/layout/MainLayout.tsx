import { ReactNode } from 'react';
import { useUIStore } from '../../store/uiStore';
import Header from './Header';
import Sidebar from './Sidebar';
import { TutorialModal } from '../game/TutorialModal';

/**
 * MainLayout Component
 *
 * Provides a consistent layout structure with header and mobile sidebar navigation.
 * Wraps page content with common layout elements and global modals.
 *
 * @param {ReactNode} children - Child components to render
 * @component
 */
interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { activeModal, closeModal, animationsEnabled } = useUIStore();

  /**
   * Handle tutorial completion
   */
  const handleTutorialComplete = () => {
    closeModal();
  };

  /**
   * Handle tutorial skip
   */
  const handleTutorialSkip = () => {
    closeModal();
  };

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

      {/* Global Modals */}
      {/* Tutorial Modal - rendered globally for access from any page */}
      {activeModal === 'tutorial' && (
        <TutorialModal
          isOpen={true}
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
          animated={animationsEnabled}
        />
      )}
    </div>
  );
}

export default MainLayout;