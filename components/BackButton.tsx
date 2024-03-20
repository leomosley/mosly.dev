'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import icon from '@/public/transparent-icon.png';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  return pathname !== "/"? (
    <button
      className="underline-offset-4 underline decoration-neutral-500 transition hover:decoration-inherit"
      onClick={() => router.back()}
    >← back
    </button>
  ) : (
    <Image
      className="w-5 h-5 filter invert"
      alt="icon"
      src={icon}
    />
  );
}