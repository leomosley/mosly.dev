'use client';
import React, { useState } from 'react';
import { HiClipboard } from 'react-icons/hi';

export default function ContactButton({ email } : { email: string }) {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);  
    }, 3000);
  }

  return (
    <>
    <div className={`${showMessage? "opacity-100" : "opacity-0"} fixed flex items-center top-3 p-3 gap-1 
                    rounded-xl text-neutral-400 bg-foreground text-base transition`}>
      <p>Email copied to clipboard</p>
      <HiClipboard />
    </div>
    <button
      className="w-1/2 bg bg-foreground p-1 text-lg rounded-lg border-2 border-solid border-neutral-700 text-neutral-400 hover:bg-neutral-700"
      onClick={handleClick}
    >Contact</button>
    </>
  )
}
