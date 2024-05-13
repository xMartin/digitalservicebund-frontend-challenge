import { act, fireEvent, render, screen } from "@testing-library/react";
import Datasets, { ApiDataEntry } from "./Datasets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function mockFetch<T>(response: T) {
  window.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    } as Response),
  );
}

it("renders heading", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  expect(
    screen.getByRole("heading", { name: "Datasets by Ministry" }),
  ).toBeInTheDocument();
});

it("renders table sorted by number of datasets", async () => {
  const payload: ApiDataEntry[] = [
    {
      department: "X",
      description: "",
      datasets: 2,
    },
    {
      department: "Z",
      description: "",
      datasets: 65,
    },
    {
      department: "Y",
      description: "",
      datasets: 8,
    },
  ];

  mockFetch(payload);

  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  const topValue = (await screen.findAllByRole("cell"))[1].innerHTML;
  expect(topValue).toBe("65");
});

it("renders percentage bars", async () => {
  const payload: ApiDataEntry[] = [
    {
      department: "A",
      description: "",
      datasets: 80,
    },
    {
      department: "B",
      description: "",
      datasets: 8,
    },
  ];

  mockFetch(payload);

  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  const secondRowCell = (await screen.findAllByRole("cell"))[2];
  const innerBarSpan = secondRowCell.firstElementChild?.firstElementChild;
  // eslint-disable-next-line
  const width = (innerBarSpan as any)?.style.width;
  expect(width).toBe("10%");
});

it("filters", async () => {
  const payload: ApiDataEntry[] = [
    {
      department: "Bundesministerium XXXY",
      description: "",
      datasets: 2,
    },
    {
      department: "Institut ZTZ5",
      description: "",
      datasets: 80,
    },
  ];

  mockFetch(payload);

  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  expect((await screen.findAllByRole("row")).length).toBe(2);

  act(() => {
    fireEvent.change(screen.getByLabelText(/filter/i), {
      target: { value: "zTz" },
    });
  });
  expect(screen.getAllByRole("row").length).toBe(1);
});
