import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import mockPokemons from './mockPokemonData/mockPokemons';

describe('Teste o componente <Pokemon.js />', () => {
  const { averageWeight } = mockPokemons[0];
  const averageWeightPok = `${averageWeight.value} ${averageWeight.measurementUnit}`;
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    renderWithRouter(<App
      pokemon={ mockPokemons }
      isFavorite={ { [mockPokemons.id]: true } }
    />);
  });

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    // O nome correto do Pokémon deve ser mostrado na tela;
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeDefined();
    expect(namePokemon).toHaveTextContent(mockPokemons[0].name);

    // O tipo correto do pokémon deve ser mostrado na tela.
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeDefined();
    expect(typePokemon).toHaveTextContent(mockPokemons[0].type);

    /* O peso médio do pokémon deve ser exibido com um texto no formato Average
     weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,
     respectivamente, o peso médio do pokémon e sua unidade de medida. */
    const averageWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(averageWeightPokemon).toBeDefined();
    expect(averageWeightPokemon).toHaveTextContent(`Average weight: ${averageWeightPok}`);

    /* A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com
    a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o
    nome do pokémon; */
    const imagePokemon = screen.getByRole('img',
      { name: `${mockPokemons[0].name} sprite` });
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon).toHaveAttribute('alt', `${mockPokemons[0].name} sprite`);
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link 
  de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL
   /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    const linkNavigatePokemon = screen.getByRole('link', { name: /More details$/i });
    expect(linkNavigatePokemon)
      .toHaveAttribute('href', `/pokemons/${mockPokemons[0].id}`);
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento 
  da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App
      pokemon={ mockPokemons }
      isFavorite={ { [mockPokemons.id]: true } }
    />);
    const linkPokemon = screen.getAllByRole('link', { name: /More details$/i });

    userEvent.click(linkPokemon[1]);
    const titleDetails = screen.getByText(/Pikachu Details/i);
    expect(titleDetails).toBeDefined();
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockPokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App
      pokemon={ mockPokemons }
      isFavorite={ { [mockPokemons.id]: true } }
    />);
    const linkPokemon = screen.getAllByRole('link', { name: /more details$/i });
    userEvent.click(linkPokemon[1]);
    const titleDetails = screen.getByText(/Pikachu Details/i);
    expect(titleDetails).toBeDefined();
    const checkedFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkedFavorite);
    const imgFavorite = screen.getByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite)
      .toHaveAttribute('alt', `${mockPokemons[0].name} is marked as favorite`);
  });
});
