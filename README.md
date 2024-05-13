# GovData Dashboard

Implementation of the [Digital Service Bund frontend challenge](https://github.com/digitalservicebund/frontend-challenge?tab=readme-ov-file).

Built, using the [React + TypeScript + Vite template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## How to get started

**Install dependencies:**
```
$ yarn
```

**Start development server:**
```
$ yarn dev
```

### Other tasks

**Lint (eslint):** `yarn lint`

**Test (vitest):** `yarn test`

**Production build:** `yarn build`

### Configuration

**Data URL**: By default, the sample data is fetched directly from Digital Service' GitHub repo. Overwrite the URL by setting the environment variable `VITE_DATA_URL`.

## Assumptions

 * The number of ministries providing data is not going to grow substantially. (Otherwise the way the data is displayed, rendered and filtered needs to be optimized.)
 * Adding more widgets, potentially connecting to additional API endpoints, is planned.

## Architecture decisions

 * Using [react-query](https://tanstack.com/query) provided an solid integration of data fetching with components, avoiding messing around with `useEffect`. It might be overkill at this stage, but when the number of widgets and endpoints grow, it's straight-forward to organize it into multiple custom hooks that can be used by multiple components. Automatic refetching and a central data cache will come in handy then.
 * Assuming for this project to grow, starting out with a 3rd-party UI component library could be a good choice, to have a rich selection elements for layout, user input and data display available. I decided against it only because the goal of this exercise is also to show off low-level skills in CSS and JavaScript. For the current size, the little code necessary to make this work seems appropriate, too.
