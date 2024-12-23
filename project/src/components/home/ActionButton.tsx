import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  iconColor: string;
  isExternalLink?: boolean;
}

export default function ActionButton({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
  buttonColor,
  iconColor,
  isExternalLink = false
}: ActionButtonProps) {
  const ButtonComponent = isExternalLink ? 'a' : Link;
  const buttonProps = isExternalLink ? {
    href: buttonLink,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {
    to: buttonLink
  };

  return (
    <div className="bg-black p-8 rounded-lg text-center group hover:bg-gray-800 transition">
      <div className={`mb-4 ${iconColor}`}>
        <Icon className="w-12 h-12 mx-auto" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ButtonComponent
        {...buttonProps}
        className={`inline-block ${buttonColor} text-white px-8 py-3 rounded-full hover:opacity-90 transition`}
      >
        {buttonText}
      </ButtonComponent>
    </div>
  );
}