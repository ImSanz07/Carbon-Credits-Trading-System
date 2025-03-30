"use client";

import React from "react";

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-bold">
      {initials}
    </div>
  );
};

export default Avatar;
