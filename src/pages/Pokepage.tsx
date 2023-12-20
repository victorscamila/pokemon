import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { likedAtom } from '../atoms/liked';
import { Pokemon, PokemonMin } from '../utils/types';

export default function Pokepage() {
    const { name } = useParams();
    const [likes, setlikes] = useAtom(likedAtom)
    const [pokemon, setPokemon] = useState<Pokemon>()

    function toggleLike(newPokemon: Pokemon) {
        const newPokemonFormated: PokemonMin = {
            name: newPokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${newPokemon.name}`
        }
        if (!likes.find(item => item.name === newPokemonFormated?.name)) {
            setlikes(prev => [...prev, newPokemonFormated])
        } else {
            setlikes(prev => prev.filter(item => item.name !== newPokemonFormated.name))
        }
    }

    function loadPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json()).then(data => {
            setPokemon(data)
            console.log(data)
        })
    }
    useEffect(() => {
        if (name) {
            loadPokemon()
        }
    }, [name])

    const isLiked = !!likes.find(item => item.name === pokemon?.name)
    return (
        <>
            {pokemon ? (
                <div>
                    <img src={pokemon.sprites.front_default} alt="" />
                    <h1>
                        {pokemon.name}
                    </h1>
                    <button onClick={() => toggleLike(pokemon)} type="button" role="switch" aria-checked={`${isLiked}`} >like</button>

                    {pokemon.types.map((type) => {
                        return (
                            <div key={type.type.name} >
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>


            ) : <></>
            }
        </>

    )
}
