import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PokemonDetail } from './pages/pokemon-detail/pokemon-detail';
import { NotFound } from './pages/not-found/not-found';
import { pokemonGuard } from './guards/pokemon.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pokemon/:name', component: PokemonDetail, canActivate: [pokemonGuard] },
  { path: '**', component: NotFound }
];
