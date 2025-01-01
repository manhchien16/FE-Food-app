import { createContext, useContext, useState, ReactNode } from 'react';

interface NumberContextType {
  number: number;
  setNumber: (number: number) => void;
}

const NumberContext = createContext<NumberContextType | null>(null);

interface NumberProviderProps {
  children: ReactNode;
}

export default function NumberProvider({ children }: NumberProviderProps) {
  const [number, setNumber] = useState<number>(0);

  return (
    <NumberContext.Provider value={{ number, setNumber }}>
      {children}
    </NumberContext.Provider>
  );
}

export const useNumber = () => {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('useNumber must be used within a NumberProvider');
  }
  return context;
};