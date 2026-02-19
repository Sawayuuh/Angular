import { Component } from '@angular/core';
import { Home } from './pages/home/home';
import { PokemonDetail } from './pages/pokemon-detail/pokemon-detail';

@Component({
  selector: 'app-root',
  imports: [Home, PokemonDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public currentPokemon: string = '';

  public navigateTo(name: string): void {
    this.currentPokemon = name;
  }

  public goBack(): void {
    this.currentPokemon = '';
  }
}
