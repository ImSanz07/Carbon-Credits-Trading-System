import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import React from 'react';

// Define the props interface
interface CreditCardProps {
    title: string;
    description: string;
    content: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ title, description, content }) => {
    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <CardDescription className="text-gray-500">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{content}</p>
            </CardContent>
            <CardFooter>
                <p className="text-blue-600 cursor-pointer">Buy Now</p>
            </CardFooter>
        </Card>
    );
}

export default CreditCard;
