"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactProps {
  phoneNumber: string;
  address: any;
}

const ContactCard: React.FC<ContactProps> = ({ phoneNumber, address }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-200 w-full max-w-full">
      <CardHeader className="bg-green-100 px-6 py-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-green-800">
          📞 Contact Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Phone Number */}
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Phone className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-gray-700 text-sm sm:text-base break-words max-w-full">
            {phoneNumber || "N/A"}
          </p>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full mt-1">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-gray-700 text-sm sm:text-base break-words max-w-full leading-relaxed">
            {address?.fullAddress || "N/A"},<br />
            {address?.district || "N/A"}, {address?.state || "N/A"},{" "}
            {address?.zipCode || "N/A"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
