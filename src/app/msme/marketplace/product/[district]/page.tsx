// app/msme/product/[district]/page.tsx
"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import React, { useState } from 'react';
import BuyingLogic from './actions/BuyingLogic';

const ProductPage: React.FC = () => {   
    const router = useRouter();
    const params = useParams();
    const district = Array.isArray(params.district) ? params.district[0] : params.district; // Handle string or string[]
    const decodedDistrict = decodeURIComponent(district);
    const searchParams = useSearchParams();
    const totalCredits = Number(searchParams.get('totalCredits')); 
    const [creditsToBuy, setCreditsToBuy] = useState<number | ''>('');

    const createOrder = async () => {
       
        
        const res =  await fetch('/api/createOrder', {
            method: 'POST',
            body: JSON.stringify({
                amount: creditsToBuy,
            }),     
        })
        const data = await res.json();
        const orderIdToReturn =  data.id;
        

        const amount = Number(creditsToBuy) * 30000;
        const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            orderId:data.id,
            amount,
            

            handler: async function(response:any){
                // console.log("Handler response object", response);

                
                const res = await fetch('/api/verifyOrder', {
                    method: 'POST',
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    }),
                });

                const data = await res.json();
                // console.log(data);

                // Returning Code for now
                if(data.isOk){
                    await updateDatabase(orderIdToReturn, response.razorpay_payment_id);
                    router.push('/msme/marketplace/payment/success')                     
                }

                // if(data.isOk){
                //     alert('Payment Successful');
                //     router.push('/msme/marketplace/payment/success')
                // }else{
                //     alert('Payment Failed');
                //     router.push('/msme/marketplace/payment/failure')
                // }

                // Return a promise that resolves with the desired object

                
            }
        }

        const payment = new (window as any).Razorpay(paymentData);
        payment.open();

    
    }

    const updateDatabase = async (orderId: string, paymentId: string) => {
        if (creditsToBuy === '' || creditsToBuy <= 0) {
            console.error("Please enter a valid amount of credits to purchase.");
            return;
        }
        if (creditsToBuy > totalCredits) {
            console.error("You cannot buy that many credits.");
            return;
        }

        const allocationObject = await BuyingLogic(creditsToBuy, district);

        const currentDateTime = new Date();

        

        const response = await fetch('/api/updateTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                paymentId,
                allocationObject, 
                creditsBought: creditsToBuy,
                amount: creditsToBuy * 30000,
                district:district,
                dateTime: currentDateTime,
            }),
        });

        const data = await response.json();

        if (data.success) {
            console.log('Transaction updated successfully');
        } else {
            console.error('Failed to update the transaction');
        }
    };
          


    const handleSubmit = async ()=>{
        console.log(`Purchasing ${creditsToBuy} credits from ${decodedDistrict}.`);
        //Implement the Payment Logic(Razorpay UI)
        await createOrder()

        setCreditsToBuy('');

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Allow only digits or empty string
        if (/^\d*$/.test(value)) {
            setCreditsToBuy(value === '' ? '' : Number(value));
        }
    };

    return (
        <div className='pl-72'>
            <Script 
                type="text/javascript" 
                src="https://checkout.razorpay.com/v1/checkout.js"
            />


            <h1>Farmers in {decodedDistrict}</h1>
            <p>Total Credits Available: {totalCredits}</p>
            <Input
                className='w-80'
                placeholder='Enter the Amount of Credits to purchase'
                type="tel" // This allows only numeric input on mobile devices
                inputMode="numeric" // This brings up a numeric keyboard on mobile
                value={creditsToBuy} // Bind value to state
                onInput={handleInputChange}
                
            />
            <Button onClick={handleSubmit}>
                Buy Credits
            </Button>
        </div>
    );
};

export default ProductPage;
