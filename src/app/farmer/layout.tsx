// app/msme/layout.tsx
import { Suspense } from "react";
import UpdatedNavbar from "./components/UpdatedNavbar";
import Loading from "../loading";

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Suspense fallback={<Loading/>}>
          <UpdatedNavbar />
          <main>{children}</main>
        </Suspense>
      </div>
    );
}
