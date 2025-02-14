import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/30 to-blue-800/30">
            <Toaster richColors position="top-right"/>
            {children}
        </div>
    )
}