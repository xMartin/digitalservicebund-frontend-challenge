import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import styles from "./Datasets.module.css";

export type ApiDataEntry = {
  department: string;
  description: string;
  datasets: number;
};

type AppDataEntry = ApiDataEntry & {
  percent: number;
};

export default function Datasets() {
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

      const result: AppDataEntry[] = [];
      for (const apiDataEntry of apiData) {
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

  return (
    <Card title="Datasets by Ministry">
      {data && (
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
      )}
    </Card>
  );
}
