import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import "@/assets/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: APP_NAME,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
