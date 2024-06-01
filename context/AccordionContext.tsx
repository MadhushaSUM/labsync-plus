import { createContext, useContext, useState, ReactNode } from 'react';

interface AccordionContextProps {
    expandedAccordion: string | null;
    setExpandedAccordion: (accordion: string | null) => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

export const AccordionProvider = ({ children }: { children: ReactNode }) => {
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

    return (
        <AccordionContext.Provider value={{ expandedAccordion, setExpandedAccordion }}>
            {children}
        </AccordionContext.Provider>
    );
};

export const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (context === undefined) {
        throw new Error('useAccordion must be used within an AccordionProvider');
    }
    return context;
};
