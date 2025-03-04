import { createContext, useContext, useState, ReactNode } from 'react';

interface StatusContextType {
    StatusState: boolean;
    setStatusState: (Status: boolean) => void;
}

const StatusContext = createContext<StatusContextType | false>(false);

interface StatusProviderProps {
    children: ReactNode;
}

export default function StatusProvider({ children }: StatusProviderProps) {
    const [StatusState, setStatusState] = useState<boolean>(false);

    return (
        <StatusContext.Provider value={{ StatusState, setStatusState }}>
            {children}
        </StatusContext.Provider>
    );
}

export const useStatus = () => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error('useStatus must be used within a StatusProvider');
    }
    return context;
};