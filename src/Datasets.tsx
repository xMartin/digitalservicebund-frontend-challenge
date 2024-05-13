import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import styles from "./Datasets.module.css";
import { SyntheticEvent, useId, useState } from "react";

export type ApiDataEntry = {
  department: string;
  description: string;
  datasets: number;
};

type AppDataEntry = ApiDataEntry & {
  percent: number;
};

export default function Datasets() {
  const [filterInput, setFilterInput] = useState("");

  const { data } = useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      const result = await fetch(import.meta.env.VITE_DATA_URL as string);
      return (await result.json()) as ApiDataEntry[];
    },
    select: (apiData) => {
      let max = 0;
      for (const apiDataEntry of apiData) {
        if (apiDataEntry.datasets > max) {
          max = apiDataEntry.datasets;
        }
      }

      let filteredData = apiData;
      if (filterInput) {
        const regExp = new RegExp(filterInput, "i");
        filteredData = apiData.filter((entry) => regExp.test(entry.department));
      }

      const result: AppDataEntry[] = [];
      for (const apiDataEntry of filteredData) {
        result.push({
          ...apiDataEntry,
          percent: (apiDataEntry.datasets / max) * 100,
        });
      }

      result.sort((a, b) => {
        return a.datasets > b.datasets ? -1 : a.datasets === b.datasets ? 0 : 1;
      });

      return result;
    },
  });

  const formId = useId();
  const filterId = `${formId}-filter`;
  const filter = (
    <div>
      <label htmlFor={filterId}>Filter:</label>{" "}
      <input
        id={filterId}
        type="text"
        value={filterInput}
        onChange={(event: SyntheticEvent<HTMLInputElement>) =>
          setFilterInput(event.currentTarget.value)
        }
      />
    </div>
  );

  return (
    <Card title="Datasets by Ministry" actions={filter}>
      {(() => {
        if (!data) {
          return null;
        }
        if (data.length) {
          return (
            <table className={styles.table}>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={entry.department} className={styles.row}>
                    <td className={styles.department}>
                      {entry.department}
                      <span className={styles.bar}>
                        <span style={{ width: `${entry.percent}%` }}></span>
                      </span>
                    </td>
                    <td id={index.toString()} className={styles.value}>
                      {entry.datasets}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        } else {
          if (filterInput) {
            return <p>No data with filter criteria “{filterInput}”.</p>;
          } else {
            return <p>No data.</p>;
          }
        }
      })()}
    </Card>
  );
}
