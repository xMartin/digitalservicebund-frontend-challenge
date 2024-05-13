import { useQuery } from "@tanstack/react-query";
import Card from "./Card";

type Dataset = {
  department: string;
  description: string;
  datasets: number;
};

export default function Datasets() {
  const { data } = useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      const result = await fetch(import.meta.env.VITE_DATA_URL as string);
      return (await result.json()) as Dataset[];
    },
  });

  return (
    <Card title="Datasets by Ministry">
      <table>
        <tbody>
          {(data || []).map((entry) => (
            <tr key={entry.department}>
              <th>{entry.department}</th>
              <td>{entry.datasets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
