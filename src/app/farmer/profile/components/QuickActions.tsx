"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Tractor, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { name: "View Carbon Credits", icon: Leaf, href: "/farmer/transactions" },
  { name: "Manage Land & Crops", icon: Tractor, href: "" },
  { name: "Account Settings", icon: Settings, href: "" },
];

const QuickActions: React.FC = () => {
  return (
    <Card className="bg-white shadow-lg rounded-lg w-full max-w-full transition-transform transform hover:scale-105 duration-200">
      {/* Header */}
      <CardHeader className="bg-green-100 px-6 py-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-green-800">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4 p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href} className="block">
              <Button
                className="w-full flex items-center justify-start text-left font-medium hover:bg-green-100 transition-all"
                variant="outline"
              >
                <action.icon className="mr-2 h-5 w-5 text-green-600" />
                <span className="truncate">{action.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
