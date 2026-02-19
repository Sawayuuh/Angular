import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { LoadState } from '../../enums/load-state.enum';
import { IPokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail implements OnInit {
  private readonly pokemonService: PokemonService = inject(PokemonService);

  @Input() name: string = '';
  @Output() back = new EventEmitter<void>();

  public pokemon: IPokemon | null = null;
  public loadState: LoadState = LoadState.IDLE;
  public errorMessage: string = '';

  public get isLoading(): boolean { return this.loadState === LoadState.LOADING; }
  public get isSuccess(): boolean { return this.loadState === LoadState.SUCCESS; }
  public get isError(): boolean { return this.loadState === LoadState.ERROR; }

  public ngOnInit(): void {
    this.loadPokemon(this.name);
  }

  /**
   * Load the Pokémon data from the API.
   *
   * @param name the name of the Pokémon to load.
   */
  public loadPokemon(name: string): void {
    this.loadState = LoadState.LOADING;
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loadState = LoadState.SUCCESS;
      },
      error: () => {
        this.errorMessage = `Impossible de charger les données du Pokémon "${name}".`;
        this.loadState = LoadState.ERROR;
      }
    });
  }

  /**
   * Capitalize the first letter of the given string.
   *
   * @param value the string to capitalize.
   * @returns the capitalized string.
   */
  public capitalize(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /**
   * Calculate the stat percentage relative to max stat value (255).
   *
   * @param value the stat value.
   * @returns the percentage.
   */
  public statPercent(value: number): number {
    return Math.min((value / 255) * 100, 100);
  }
}
