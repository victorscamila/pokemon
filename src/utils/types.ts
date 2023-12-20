type PokemonMin = {
    name: string;
    url: string;
}
type PType = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
type Pokemon = {
    name: string;
    sprites: {
        front_default: string;
    };
    types: PType[];
}
export type {PokemonMin, Pokemon}
