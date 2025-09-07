import { createContext, ReactNode, useState, useContext } from "react";

export type FormState = Record<string, any>;

const DataContext = createContext<FormState>({});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormState>({});

  const setValues = (values: FormState) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <DataContext value={{data, setValues}}>
      {children}
    </DataContext>
  );
};

export const useData = () => useContext(DataContext);
