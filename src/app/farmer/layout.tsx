// app/msme/layout.tsx
import UpdatedNavbar from "./components/UpdatedNavbar";

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <UpdatedNavbar />
            <main>{children}</main>
        </div>
    );
}
