import React from 'react';
import { Metadata } from 'next';
import Terminal from '@/components/Terminal';
    
export const metadata: Metadata = {
  title: 'Terminal | Leo Mosley'
}

export default function Home() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Terminal />
    </div>
  );
}
