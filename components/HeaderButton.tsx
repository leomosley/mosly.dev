import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  label: string;
  href: string;
}

export default function HeaderButton({
  label,
  href
}: Props) {
  const className = clsx(
    "text-lg font-mono glow text-gray-300 hover:text-gray-200"
  );

  return (label[0] === "/") ? (
    <Link 
      className={className}
      href={href}
    >{label}
    </Link>
  ) : (
    <a
      className={className}
      href={href}
    >{label}
    </a>
  );
}
