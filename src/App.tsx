import { useEffect } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-styled-table";

import useTableData from "./hook/useTableData";
import { theme } from "./theme";
import { STEP, Status, headers } from "./constant";

function App() {
  const {
    tableData,
    currentStep,
    totalSteps,
    handleNext,
    handlePrv,
    fetchData,
  } = useTableData(STEP);

  const disablePrv = currentStep === 0;
  const disableNext = currentStep === totalSteps - 1;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Table theme={theme}>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header.name}</Th>
            ))}
          </Tr>
        </Thead>
        {tableData.status === Status.SUCCESS && (
          <Tbody>
            {tableData.apiTableData?.map((data, index) => (
              <Tr key={index}>
                <Td>{data.id}</Td>
                <Td>{data.title}</Td>
                <Td>{data.completed === true ? "yes" : "no"}</Td>
                <Td>{data.userId}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
      <div> {tableData.status === Status.LOADING && "Loading..."}</div>
      <div>
        <div className="button-container">
          <button
            data-testid="prv-button"
            disabled={disablePrv}
            onClick={handlePrv}
            className={`button-style ${disablePrv && `disabled`}`}
          >
            Previous
          </button>
          <button
            data-testid="next-button"
            disabled={disableNext}
            onClick={handleNext}
            className={`button-style ${disableNext && `disabled`}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
