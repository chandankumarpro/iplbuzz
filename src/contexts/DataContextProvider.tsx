import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import Papa from "papaparse";
import { DataContextType, Match } from "../common/interfaces";
import { csvUrl } from "../common/constants";

import { useSpinner } from "./SpinnerContext";

const DataContext = createContext<DataContextType>({ data: [] });

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContextProvider: FC<DataContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<Match[]>([]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const { setLoading } = useSpinner();

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
       await delay(1000);
      const response = await axios.get(csvUrl);
      Papa.parse<Match>(response.data, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data.filter(row => row.Teams) as Match[]);
        },
      });
    } catch (error) {
      console.error("Error fetching/parsing CSV:", error);
      await delay(2000);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
