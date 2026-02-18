import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCard {
  /**
   * The Pokémon name.
   */
  @Input() name: string = '';

  /**
   * The Pokémon id extracted from its API url.
   */
  @Input() id: number = 0;

  /**
   * Build the sprite URL from the Pokémon id.
   *
   * @returns the sprite URL.
   */
  public get spriteUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }

  /**
   * Format the Pokémon id with leading zeros.
   *
   * @returns the formatted id.
   */
  public get formattedId(): string {
    return this.id.toString().padStart(3, '0');
  }
}
