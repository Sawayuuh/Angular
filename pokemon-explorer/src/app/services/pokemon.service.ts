import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemon, IPokemonList } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2';
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Retrieve the list of Pokémon.
   *
   * @param limit the number of Pokémon to retrieve.
   * @param offset the offset to start from.
   * @returns an Observable of the Pokémon list.
   */
  public getPokemonList(limit: number = 151, offset: number = 0): Observable<IPokemonList> {
    return this.http.get<IPokemonList>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  /**
   * Retrieve a Pokémon by its name or id.
   *
   * @param name the name or id of the Pokémon.
   * @returns an Observable of the Pokémon.
   */
  public getPokemonByName(name: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.apiUrl}/pokemon/${name}`);
  }
}
