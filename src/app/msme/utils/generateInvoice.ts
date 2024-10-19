import jsPDF from "jspdf";
import "jspdf-autotable";

interface Transaction {
    creditsBought: number;
    _id: string;
    paymentId: string;
    orderId: string;
    amount: number;
    dateTime: string;
    district: string;
}

export const generatePDF = async (transaction: Transaction, gstin: string) => {
    try {
        // Call the API to fetch MSME details by GSTIN
        const res = await fetch(`/api/msme/profile/fetchUserInfo/${gstin}`);
        const msmeData = await res.json();

        if (!res.ok) {
            throw new Error(msmeData.error || 'Failed to fetch MSME details');
        }

        const { businessName, businessAddress, email, phoneNumber } = msmeData;

        const doc = new jsPDF();

        // Set fonts for header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 128, 0); // Green color
        doc.text("Tax Invoice", 105, 25, { align: "center" });

        // MSME Details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text(businessName, 20, 40);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(businessAddress, 20, 47);
        doc.text(`Phone: ${phoneNumber}`, 20, 54);
        doc.text(`Email: ${email}`, 20, 61);
        doc.text(`Website: www.example.com`, 20, 68);
        doc.text(`GSTIN: ${gstin}`, 20, 75);

        // Invoice details
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Invoice Number: INV-${transaction.orderId.slice(-6)}`, 190, 40, { align: "right" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Date: ${new Date(transaction.dateTime).toLocaleDateString()}`, 190, 47, { align: "right" });
        doc.text(`Time: ${new Date(transaction.dateTime).toLocaleTimeString()}`, 190, 54, { align: "right" });

        // Transaction details table
        doc.autoTable({
            startY: 85,
            head: [["Description", "HSN/SAC","District", "Quantity", "Rate", "Amount"]],
            body: [
                [
                    "Carbon Credits",
                    "[HSN_CODE]",
                    transaction.district,
                    transaction.creditsBought.toString(),
                    `Rs. ${(transaction.amount / transaction.creditsBought).toFixed(2)}`,
                    `Rs. ${transaction.amount.toFixed(2)}`
                ],
                ["", "", "", "Subtotal", `Rs. ${transaction.amount.toFixed(2)}`],
                ["", "", "", "CGST (9%)", `Rs. ${(transaction.amount * 0.09).toFixed(2)}`],
                ["", "", "", "SGST (9%)", `Rs. ${(transaction.amount * 0.09).toFixed(2)}`],
                ["", "", "", "Total", `Rs. ${(transaction.amount * 1.18).toFixed(2)}`]
            ],
            styles: { fontSize: 9, cellPadding: 5 },
            headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
            footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold" }
        });

        // Payment information
        const finalY = (doc as any).lastAutoTable.finalY || 85;
        doc.setFontSize(10);
        doc.text(`Payment ID: ${transaction.paymentId}`, 20, finalY + 15);
        doc.text(`Order ID: ${transaction.orderId}`, 20, finalY + 22);

        // Bank details
        doc.setFont("helvetica", "bold");
        doc.text("Bank Details:", 20, finalY + 35);
        doc.setFont("helvetica", "normal");
        doc.text(`Bank Name: State Bank of India`, 20, finalY + 42);
        doc.text(`Account Number: 1234567890`, 20, finalY + 49);
        doc.text(`IFSC Code: SBIN0001234`, 20, finalY + 56);

        // Terms and Conditions
        doc.setFont("helvetica", "bold");
        doc.text("Terms and Conditions:", 20, finalY + 70);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text("1. Payment is due within 30 days.", 20, finalY + 77);
        doc.text("2. Carbon credits are non-refundable once issued.", 20, finalY + 84);
        doc.text("3. Please quote invoice number for all communications.", 20, finalY + 91);

        // Footer
        doc.setFontSize(10);
        doc.text("Thank you for your business!", 105, 280, { align: "center" });
        doc.text("For any queries, please contact support@carboncredits.com", 105, 287, { align: "center" });

        // Add page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${pageCount}`, 105, 295, { align: "center" });
        }

        // Save the PDF
        doc.save(`Invoice_${transaction.orderId}.pdf`);

    } catch (error) {
        console.error('Error generating invoice:', error);
        alert('An error occurred while generating the invoice.');
    }
};