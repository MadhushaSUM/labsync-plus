"use client";

import { InvestigationType } from '@/types/entity/investigation';
import { InvestigationRegisterType } from '@/types/entity/investigationRegister';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedInvestigationContextProps {
    investigationData?: {
        investigationRegister: InvestigationRegisterType,  
        investigation: InvestigationType,
    };
    setInvestigationData: React.Dispatch<React.SetStateAction<{
        investigationRegister: InvestigationRegisterType;
        investigation: InvestigationType;
    } | undefined>>;
}

const SelectedInvestigationContext = createContext<SelectedInvestigationContextProps | undefined>(undefined);

export const SelectedInvestigationProvider = ({ children }: { children: ReactNode }) => {
    const [investigationData, setInvestigationData] = useState<{
        investigationRegister: InvestigationRegisterType;
        investigation: InvestigationType;
    }>();
    
    return (
        <SelectedInvestigationContext.Provider value={{ investigationData, setInvestigationData }}>
            {children}
        </SelectedInvestigationContext.Provider>
    );
};

export const useSelectedInvestigation = () => {
    const context = useContext(SelectedInvestigationContext);
    if (context === undefined) {
        throw new Error('useSelectedInvestigation must be used within an SelectedInvestigationProvider');
    }
    return context;
};
