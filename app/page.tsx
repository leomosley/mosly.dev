import React from 'react';
import { Metadata } from 'next'
import Header from '@/components/Header';
 
export const metadata: Metadata = {
  title: 'Portfolio | Leo Mosley'
}

export default function Home() {
  return (
    <>
    <Header />
    <section className="flex items-center h-screen">
      <div className="">
        <p>hello</p>
      </div>
      <div>
        
      </div>
    </section>
    </>
  );
}
