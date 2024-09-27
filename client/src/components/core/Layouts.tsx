import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className='flex flex-col min-h-screen w-full'>
        <main className='flex-1'>
          {children}
        </main>
        <div className='sticky bottom-0 w-full'>
          <BottomNavigation />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
