import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { MobileStickyBar } from '../components/layout/MobileStickyBar';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FC] selection:bg-[#F4C542] selection:text-[#071B3A]">
      <Header />
      <main className="flex-1 pt-[120px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </div>
  );
};
