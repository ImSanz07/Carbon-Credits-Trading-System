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
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-green-800">
          Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Phone className="mr-2 h-5 w-5 text-green-600" />
          <p className="text-gray-600">{phoneNumber}</p>
        </div>
        <div className="flex items-start">
          <MapPin className="mr-2 h-5 w-5 text-green-600 mt-1" />
          <p className="text-gray-600 leading-relaxed">
            {address.fullAddress},<br />
            {address.district}, {address.state}, {address.zipCode}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
