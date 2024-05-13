import { render, screen } from "@testing-library/react";
import Datasets from "./Datasets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

it("renders heading", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <Datasets />
    </QueryClientProvider>,
  );

  expect(screen.getByText(/Datasets by Ministry/)).toBeInTheDocument();
});
