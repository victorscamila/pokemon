import { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import useHasMounted from '../hook/useHasMounted';
import { likedAtom } from '../atoms/liked';
import { PokemonMin } from '../utils/types';
import { Link } from 'react-router-dom';

export default function Home() {
    const [pokemons, setPokemons] = useState<PokemonMin[]>([])
    const [likes, setlikes] = useAtom(likedAtom)
    const hasMounted = useHasMounted()
    function toggleLike(pokemon: PokemonMin) {
        if (!likes.find(item => item.name === pokemon?.name)) {
            setlikes(prev => [...prev, pokemon])
        } else {
            setlikes(prev => prev.filter(item => item.name !== pokemon.name))
        }
    }
    function loadPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}`).then(res => res.json()).then(data => {
            setPokemons(prev => prev.concat(data.results))
        })
    }

    useEffect(() => {
        if (hasMounted) {
            loadPokemon()
        }
    }, [hasMounted])


    return (
        <>
            <ul className="main-list">

                {/* {JSON.stringify(pokemons)} */}
                {pokemons.map((pokemon, index) => {
                    const isLiked = !!likes.find(item => item.name === pokemon?.name)
                    return (
                        <li key={`pokemon-${index}`}>
                            {pokemon.name}
                            <button onClick={() => toggleLike(pokemon)} type="button" role="switch" aria-checked={`${isLiked}`} >like</button>
                            <Link to={`/${pokemon.name}`}>more information</Link>
                        </li>
                    )
                })}
                <br /><br />

                {likes.map((pokemon) => {
                    return (
                        <p key={`like-${pokemon.name}`}>
                            {pokemon.name}
                        </p>
                    )
                })}
                <button onClick={loadPokemon}>
                    more
                </button>
            </ul>
        </>
    )

}
