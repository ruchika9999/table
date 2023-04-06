import { useState } from "react";
import axios from "axios";
import { API_URL, Status } from "../constant";

type Data = {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
};

export interface TableDataType {
  status: Status;
  apiTableData: Data[][];
}

const initialTableData = { status: Status.INITIAL, apiTableData: [] };

const chunkArray = (arr: Data[], chunkSize: number): Data[][] => {
  const chunkedArray: Data[][] = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArray.push(arr.slice(index, index + chunkSize));
    index += chunkSize;
  }
  return chunkedArray;
};

const useTableData = (stepCount: number) => {
  const [tableData, setTableData] = useState<TableDataType>(initialTableData);
  const [currentStep, setStep] = useState(0);

  const fetchData = async () => {
    setTableData((state) => ({ ...state, status: Status.LOADING }));

    const result = await axios.get(API_URL);
    setTableData((state) => ({
      ...state,
      status: Status.SUCCESS,
      apiTableData: chunkArray(result?.data, stepCount),
    }));

    try {
    } catch (error) {
      setTableData((state) => ({ ...state, status: Status.ERROR }));
    }
  };

  const handlePrv = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < tableData.apiTableData.length - 1) {
      setStep(currentStep + 1);
    }
  };

  return {
    tableData: {
      ...tableData,
      apiTableData: tableData.apiTableData[currentStep],
    },
    currentStep,
    totalSteps: tableData.apiTableData?.length,
    handlePrv,
    handleNext,
    fetchData,
  };
};

export default useTableData;
