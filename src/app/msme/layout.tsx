// app/msme/layout.tsx
import MSMENavbar from "./components/MSMENavbar";

export default function MsmeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MSMENavbar />
            <main>{children}</main>
        </div>
    );
}
