import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadState } from '../../enums/load-state.enum';
import { IPokemonListItem } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, PokemonCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private readonly pokemonService: PokemonService = inject(PokemonService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  @Output() navigate = new EventEmitter<string>();

  public allPokemons: IPokemonListItem[] = [];
  public filteredPokemons: IPokemonListItem[] = [];
  public loadState: LoadState = LoadState.IDLE;
  public errorMessage: string = '';

  public get isLoading(): boolean { return this.loadState === LoadState.LOADING; }
  public get isSuccess(): boolean { return this.loadState === LoadState.SUCCESS; }
  public get isError(): boolean { return this.loadState === LoadState.ERROR; }

  public searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.minLength(2)]]
  });

  constructor() {
    this.loadPokemons();
  }

  /**
   * Load the list of Pokémon from the API.
   */
  public loadPokemons(): void {
    this.loadState = LoadState.LOADING;
    this.pokemonService.getPokemonList(151).subscribe({
      next: (data) => {
        this.allPokemons = data.results;
        this.filteredPokemons = data.results;
        this.loadState = LoadState.SUCCESS;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger la liste des Pokémon. Veuillez réessayer.';
        this.loadState = LoadState.ERROR;
      }
    });
  }

  /**
   * Filter the Pokémon list based on the search form value.
   */
  public onSearch(): void {
    const term: string = this.searchForm.get('search')?.value?.toLowerCase().trim() ?? '';
    if (!term) {
      this.filteredPokemons = this.allPokemons;
    } else {
      this.filteredPokemons = this.allPokemons.filter(p => p.name.includes(term));
    }
  }

  /**
   * Reset the search form and restore the full Pokémon list.
   */
  public onReset(): void {
    this.searchForm.reset();
    this.filteredPokemons = this.allPokemons;
  }

  /**
   * Extract the Pokémon id from its API URL.
   *
   * @param url the API URL of the Pokémon.
   * @returns the Pokémon id as a number.
   */
  public onSelectPokemon(name: string): void {
    this.navigate.emit(name);
  }

  public getPokemonId(url: string): number {
    const parts = url.split('/').filter(p => p);
    return parseInt(parts[parts.length - 1], 10);
  }
}
