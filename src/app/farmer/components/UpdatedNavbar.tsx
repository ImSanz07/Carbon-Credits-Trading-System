"use client";

import React, { useState } from "react";
import { handleSignOut } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, ScrollTextIcon, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const UpdatedNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOutWithToast = async () => {
    try {
      await handleSignOut();
      toast.success("You have successfully signed out.");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-start">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <Leaf className="h-8 w-8 text-white" />
          <Link
            href="/farmer/home"
            className="text-2xl font-bold max-w-[220px] sm:max-w-full whitespace-normal break-words"
          >
            Carbon Credits Trading System (Farmer)
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem href="/farmer/profile" label="Profile" icon={User} />
          <NavItem href="/farmer/transactions" label="Transactions" icon={ScrollTextIcon} />
          <form action={handleSignOutWithToast}>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-green-800 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 text-white px-6 py-4 space-y-4">
          <NavItem
            href="/farmer/profile"
            icon={User}
            label="Profile"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavItem
            href="/farmer/transactions"
            icon={ScrollTextIcon}
            label="Transactions"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <form
            action={handleSignOutWithToast}
            className="w-full"
            onSubmit={() => setMenuOpen(false)}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

/* Reusable Navigation Item */
const NavItem = ({
  href,
  icon: Icon,
  mobile = false,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  mobile?: boolean;
  onClick?: () => void;
  label: string;
}) => (
  <Link
    href={href}
    className={`flex items-center space-x-2 ${
      mobile
        ? "block py-2 text-white hover:text-green-200 transition-colors"
        : "hover:text-green-200 transition-colors"
    }`}
    onClick={onClick}
  >
    <Icon className="h-6 w-6" />
    <span className="text-lg">{label}</span>
  </Link>
);

export default UpdatedNavbar;
