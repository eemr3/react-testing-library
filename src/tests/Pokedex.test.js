import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';
import mockPokemos from './mockPokemonData/mockPokemons';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ { [mockPokemos.id]: true } }
    />);
  });
  const pokemonNameTestId = 'pokemon-name';
  it('este se página contém um heading "h2" com o texto "Encountered pokémons"', () => {
    const titleEncountered = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });

    expect(titleEncountered).toHaveTextContent('Encountered pokémons');
  });

  it(`Teste se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado.`, () => {
    const btnProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnProximo).toBeInTheDocument();

    const namePokemon = screen.getByTestId(pokemonNameTestId);
    expect(namePokemon).toHaveTextContent(mockPokemos[0].name);
    userEvent.click(btnProximo);
    expect(namePokemon).toHaveTextContent(mockPokemos[1].name);
    userEvent.click(btnProximo);
    expect(namePokemon).toHaveTextContent(mockPokemos[2].name);
    userEvent.click(btnProximo);
    expect(namePokemon).toHaveTextContent(mockPokemos[0].name);
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const btnProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnProximo).toBeInTheDocument();
    userEvent.click(btnProximo);
    const infoPokemon = screen.getAllByRole('img');
    expect(infoPokemon).toHaveLength(1);
  });

  it(`Deve existir um botão de filtragem para cada
   tipo de Pokémon, sem repetição.`, () => {
    mockPokemos.forEach((porkemon) => {
      const btnType = screen.getByRole('button', { name: porkemon.type });
      expect(btnType).toHaveTextContent(porkemon.type);
    });
  });

  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular 
  somente pelos pokémons daquele tipo`, () => {
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[1]).toHaveTextContent(/Fire$/i);
    userEvent.click(btnType[1]);
    const infoTypePokemon = screen.getByTestId('pokemon-type');
    expect(infoTypePokemon).toHaveTextContent('Fire');
  });

  it('O botão All precisa estar sempre visível.', () => {
    const btnType = screen.getByRole('button', { name: /All/i });
    expect(btnType).toBeVisible();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnTypeAll = screen.getByRole('button', { name: /all/i });
    expect(btnTypeAll).toHaveTextContent(/All$/i);
  });

  it(`A Pokedéx deverá mostrar os Pokémons normalmente
   (sem filtros) quando o botão "All" for clicado;`, () => {
    const btnTypeAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnTypeAll);
    expect(btnTypeAll).toBeDefined();
    const namePokemon = screen.getByTestId(pokemonNameTestId);
    userEvent.click(btnTypeAll);
    expect(namePokemon).toHaveTextContent(mockPokemos[0].name);
  });

  it('Ao carregar a página, o filtro selecionado deverá ser "All"', () => {
    const btnAllSelected = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAllSelected);
    userEvent.click(btnAllSelected);
    const namePokemon = screen.getByTestId(pokemonNameTestId);
    expect(namePokemon).toHaveTextContent(/Pikachu$/i);
  });
});
