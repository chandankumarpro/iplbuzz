import { render, screen } from "@testing-library/react";
import { playerData } from "../../../../data/playerData";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PlayerProfileCard from "../../../../pages/Teams/players/PlayerProfileCard";

jest.mock("highcharts-react-official", () => () => <div>Mocked Chart</div>);
jest.mock("Highcharts", () => () => <div>Mocked Chart</div>);
jest.mock("highcharts/modules/accessibility", () => jest.fn());

function renderWithRoute(playerName: string) {
     render(
      <MemoryRouter initialEntries={[`/players/${playerName}`]}>
        <Routes>
          <Route path="/players/:name" element={<PlayerProfileCard />} />
        </Routes>
      </MemoryRouter>
    );
}

describe("Players Component", () => {
  beforeEach(() => {
    renderWithRoute("Virat Kohli");
  });

  test("renders player's name", () => {
    const playername = screen.getAllByRole("heading", { name: /virat kohli/i });
    expect(playername[0]).toBeInTheDocument();
  });

  test("renders player's date of birth", () => {
    const found = screen
      .getAllByText(() => true)
      .some((el) => el.textContent?.includes(playerData.DoB));
    expect(found).toBe(true);
  });
});
