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
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const MSMENavbar = () => {
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
          <NavItem href="/msme/profile" icon={User} />
          <NavItem href="/msme/marketplace" icon={StoreIcon} />
          <NavItem href="/msme/transactions" icon={ScrollTextIcon} />
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
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 text-white px-6 py-4 space-y-4">
          <NavItem href="/msme/profile" icon={User} mobile />
          <NavItem href="/msme/marketplace" icon={StoreIcon} mobile />
          <NavItem href="/msme/transactions" icon={ScrollTextIcon} mobile />
          <Button
            variant="outline"
            size="sm"
            className="w-full text-white border-white bg-green-700 hover:bg-white hover:text-green-700 transition-all"
            onClick={handleSignOutWithToast}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
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
}: {
  href: string;
  icon: React.ElementType;
  mobile?: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center space-x-2 ${
      mobile ? "block py-2" : "hover:text-green-200 transition-colors"
    }`}
  >
    <Icon className="h-6 w-6" />
  </Link>
);

export default MSMENavbar;
