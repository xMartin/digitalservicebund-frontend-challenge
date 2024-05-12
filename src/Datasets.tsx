import { useQuery } from "@tanstack/react-query";

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
    <>
      <h2>Datasets by ministry</h2>
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
    </>
  );
}
