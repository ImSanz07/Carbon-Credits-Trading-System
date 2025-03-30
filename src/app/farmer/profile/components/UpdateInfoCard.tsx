"use client";

import React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const UpdateInfoCard: React.FC = () => {
  return (
    <Card className="col-span-2 bg-green-700 text-white shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          Ready to Update Your Information?
        </h3>
        <p className="mb-4">
          Keep your account details up-to-date for better service and accurate
          reporting.
        </p>
        <Button
          variant="secondary"
          className="bg-white text-green-800 hover:bg-green-100"
        >
          <Link className="flex items-center" href="">
            Edit Profile <Edit className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdateInfoCard;
