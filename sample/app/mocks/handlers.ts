import { rest, type RestHandler } from "msw";

export const handlers: RestHandler[] = [
    rest.get("/pokemons", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                "Bulbasaur",
                "Ivysaur",
                "Venusaur",
                "Charmander",
                "Charmeleon",
                "Charizard",
                "Squirtle",
                "Wartortle",
                "Blastoise",
                "Caterpie",
                "Metapod",
                "Butterfree",
                "Weedle",
                "Kakuna",
                "Beedrill",
                "Pidgey",
                "Pidgeotto",
                "Pidgeot",
                "Rattata",
                "Raticate"
            ])
        );
    })
];
