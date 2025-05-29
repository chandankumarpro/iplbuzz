import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Teams from "../../../pages/Teams/Teams";

jest.mock("../../../contexts/DataContextProvider", () => ({
  useDataContext: () => ({
    data: [],
  }),
}));
jest.mock('highcharts-react-official', () => () => <div>Mocked Chart</div>);
jest.mock('Highcharts', () => () => <div>Mocked Chart</div>);
jest.mock('highcharts/modules/accessibility', () => jest.fn());

function renderWithRoute(teamName: string) {
    render(
      <MemoryRouter initialEntries={[`/teams/${teamName}`]}>
        <Routes>
          <Route path="/teams/:name" element={<Teams />} />
        </Routes>
      </MemoryRouter>
    );
}

describe("Teams Component", () => {
    beforeEach(() => {
        renderWithRoute("Mumbai Indians")
    })
  test("Should render the component into the screen", () => {
    const headings = screen.getAllByRole("heading", { name: /Mumbai Indians/i });
    expect(headings[0]).toBeInTheDocument();
  });
});
