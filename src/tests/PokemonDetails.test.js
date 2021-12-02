import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import mockPokemons from './mockPokemonData/mockPokemons';

const match = { params: { id: '25' } };
describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<PokemonDetails
      pokemons={ mockPokemons }
      match={ match }
      isPokemonFavoriteById={ { [mockPokemons[0].id]: true } }
      onUpdateFavoritePokemons={ () => true }
    />);
  });

  it(`Teste se as informações detalhadas do 
  Pokémon selecionado são mostradas na tela.`, () => {
    /* A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon; */
    const titleDetails = screen.getByText(`${mockPokemons[0].name} Details`);
    expect(titleDetails).toBeInTheDocument();

    /* Não deve existir o link de navegação para os detalhes do Pokémon selecionado. */
    const linkDetails = screen.queryByRole('link', { name: /More details$/i });
    expect(linkDetails).not.toBeInTheDocument();

    /* A seção de detalhes deve conter um heading h2 com o texto Summary. */
    const headingSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    /* A seção de detalhes deve conter um parágrafo com o resumo
    do Pokémon específico sendo visualizado. */
    const paragraphSummary = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraphSummary).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas contendo as 
  localizações do pokémon`, () => {
    /* Na seção de detalhes deverá existir um heading h2 com o texto Game Locations
    of <name>; onde <name> é o nome do Pokémon exibido. */
    const headingLocation = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${mockPokemons[0].name}` });
    expect(headingLocation).toBeInTheDocument();

    /* Todas as localizações do Pokémon devem ser mostradas na seção de detalhes; */
    const { foundAt } = mockPokemons[0];
    foundAt.forEach((location, index) => {
      const locationPokemon = screen.getAllByText(location.location);
      expect(locationPokemon).toBeDefined();
      /* Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização; */
      const nameLocation = screen.getByText(location.location);
      expect(nameLocation).toBeInTheDocument();
      const imageLocation = screen.getAllByRole('img',
        { name: `${mockPokemons[0].name} location` });
      expect(imageLocation[index]).toHaveAttribute('src', `${location.map}`);
      expect(imageLocation[index])
        .toHaveAttribute('alt', `${mockPokemons[0].name} location`);
    });
  });

  it(`Teste se o usuário pode favoritar um pokémon através da
   página de detalhes.`, () => {
    const storagePokemon = [];
    /* A página deve exibir um checkbox que permite favoritar o Pokémon; */
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();

    /* Cliques alternados no checkbox devem adicionar e remover respectivamente
    o Pokémon da lista de favoritos; */
    userEvent.click(checkboxFavorite);
    storagePokemon.push(mockPokemons[0]);
    expect(storagePokemon).toHaveLength(1);
    userEvent.click(checkboxFavorite);
    storagePokemon.pop(mockPokemons[0]);
    expect(storagePokemon).toHaveLength(0);

    /* O label do checkbox deve conter o texto Pokémon favoritado?; */
    const labelPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(labelPokemon).toBeInTheDocument();
  });
});
