import { SelectedInvestigationProvider } from "@/context/SelectedInvestigationContext";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SelectedInvestigationProvider>
            <div>
                {children}
            </div>
        </SelectedInvestigationProvider>
    );

}
