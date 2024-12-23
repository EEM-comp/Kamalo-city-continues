import React from 'react';
import { Link } from 'react-router-dom';

interface HeroButtonProps {
  to?: string;
  href?: string;
  color: string;
  children: React.ReactNode;
}

export default function HeroButton({ to, href, color, children }: HeroButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} text-white px-8 py-3 rounded-full hover:opacity-90 transition`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to!}
      className={`${color} text-white px-8 py-3 rounded-full hover:opacity-90 transition`}
    >
      {children}
    </Link>
  );
}