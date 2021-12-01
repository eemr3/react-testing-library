import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import Pokemon from '../components/Pokemon';

import App from '../App';

import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem "No favorite pokemon found", 
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFavorite = screen.getByText('No favorite pokemon found');
    expect(notFoundFavorite).toHaveTextContent('No favorite pokemon found');
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');
    const checkFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();

    history.push('/favorites');
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      showDetailsLink={ false }
      isFavorite
    />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon[0]).toHaveTextContent('Ekans');
  });
});
