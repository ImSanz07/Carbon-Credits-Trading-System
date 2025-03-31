"use client";
import { handleSignOut } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  User,
  ScrollTextIcon,
  LogOut,
  StoreIcon,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const MSMENavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Sign-out with toast
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
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <Leaf className="h-8 w-8 text-white" />
          <Link href="/msme/home" className="text-2xl font-bold">
            Carbon Credits Trading System (MSME)
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem href="/msme/profile" icon={User} label="Profile" />
          <NavItem
            href="/msme/marketplace"
            icon={StoreIcon}
            label="Marketplace"
          />
          <NavItem
            href="/msme/transactions"
            icon={ScrollTextIcon}
            label="Transactions"
          />
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition-all duration-200"
            onClick={handleSignOutWithToast}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-green-800 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* ✅ Mobile Menu with Overlay */}
      {/* ✅ Mobile Menu with Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50 shadow-lg`}
      >
        <div className="px-6 py-4 relative">
          <button
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-green-700 transition-all"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* ✅ Mobile Menu Items */}
          <div className="space-y-6 mt-8">
            <NavItem href="/msme/profile" icon={User} label="Profile" mobile />
            <NavItem
              href="/msme/marketplace"
              icon={StoreIcon}
              label="Marketplace"
              mobile
              onClick={() => setMenuOpen(false)}
            />
            <NavItem
              href="/msme/transactions"
              icon={ScrollTextIcon}
              label="Transactions"
              mobile
              onClick={() => setMenuOpen(false)}
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition-all"
              onClick={() => {
                handleSignOutWithToast();
                setMenuOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ✅ Reusable Nav Item */
const NavItem = ({
  href,
  icon: Icon,
  label,
  mobile = false,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  mobile?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className={`flex items-center space-x-2 ${
      mobile ? "block py-2" : "hover:text-green-200 transition-colors"
    }`}
    onClick={onClick} // ✅ Close on click
  >
    <Icon className="h-6 w-6" />
    <span className="text-lg">{label}</span>
  </Link>
);

export default MSMENavbar;
