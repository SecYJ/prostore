import { ReactNode } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="wrapper flex-1">{children}</div>
            <Footer />
        </div>
    );
};

export default RootLayout;
