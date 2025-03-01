import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return <div className="grid min-h-screen content-center">{children}</div>;
};

export default AuthLayout;
