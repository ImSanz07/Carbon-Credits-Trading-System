"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const SellCreditsCard: React.FC = () => {
  return (
    <Card className="col-span-2 bg-green-700 text-white shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          Ready to Sell Your Carbon Credits?
        </h3>
        <p className="mb-4">
          List your available carbon credits on our marketplace and connect with
          potential buyers.
        </p>
        <Button
          variant="secondary"
          className="bg-white text-green-800 hover:bg-green-100"
        >
          <Link className="flex items-center" href="">
            List Carbon Credits <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SellCreditsCard;
