import { render, screen } from "@testing-library/react";
import Datasets, { ApiDataEntry } from "./Datasets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

it("renders heading", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  expect(screen.getByText(/Datasets by Ministry/)).toBeInTheDocument();
});

it("renders table sorted by number of datasets, with percentage bars", async () => {
  const payload: ApiDataEntry[] = [
    {
      department: "X",
      description: "",
      datasets: 2,
    },
    {
      department: "Z",
      description: "",
      datasets: 80,
    },
    {
      department: "Y",
      description: "",
      datasets: 8,
    },
  ];

  window.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(payload),
    } as Response),
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  const topValue = (await screen.findAllByRole("cell"))[1].innerHTML;
  expect(topValue).toBe("80");

  const secondRowCell = (await screen.findAllByRole("cell"))[2];
  const innerBarSpan = secondRowCell.firstElementChild?.firstElementChild;
  // eslint-disable-next-line
  const width = (innerBarSpan as any)?.style.width;
  expect(width).toBe("10%");
});
