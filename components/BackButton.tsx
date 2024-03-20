'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="underline-offset-4 underline decoration-neutral-500 transition hover:decoration-inherit"
      onClick={() => router.back()}
    >← back
    </button>
  )
}
