import { render } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

describe("PokemonCard Component", () => {
    it("rendered input", () => {
        const { getByTestId } = render(<PokemonCard id={1} name={"bulbasaur"} type={"Grass"} />);
        const pokemonCard = getByTestId("pokemonCardTestId");
        expect(pokemonCard).toBeTruthy();
    });
});