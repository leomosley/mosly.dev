import clsx from 'clsx';
import React from 'react';
import HeaderButton from './HeaderButton';

export default function Header() {
  const navigation = [
    {label: "Terminal", href: "/terminal"},
    {label: "Projects", href: "#projects"},
    {label: "Skills", href: "#skills"},
  ];

  return (
    <nav 
      className={clsx(
        "fixed flex justify-center items-center",
        "w-screen p-3 gap-4 backdrop-blur-md", 
      )}
    >      
      {navigation.map((item, index) => (
        <HeaderButton {...item} key={index} />
      ))}
    </nav>
  );
}
