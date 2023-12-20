import { atom } from 'jotai'
import { PokemonMin } from '../utils/types'

const likedAtom = atom<PokemonMin[]>([])

export {likedAtom}