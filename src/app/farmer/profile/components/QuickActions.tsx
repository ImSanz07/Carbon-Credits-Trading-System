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
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-green-800">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className="flex items-center">
            <Button
              className="w-full justify-start text-left font-normal hover:bg-green-100 transition-all"
              variant="outline"
            >
              <action.icon className="mr-2 h-4 w-4 text-green-600" />
              {action.name}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
