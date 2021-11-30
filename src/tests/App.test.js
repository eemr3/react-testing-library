import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste do componete App', () => {
  it('Testa renderização do topo da aplicação e links', () => {
    renderWithRouter(<App />);
    const titleHeaderApp = screen.getByText(/pokédex/i);
    expect(titleHeaderApp).toBeInTheDocument();
  });

  it('testa se link home esta renderizado na página e se é redirecionada para rota \'/\'',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.queryByRole('link', { name: /home/i });
      expect(linkHome).toBeDefined();
      userEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('testa se link about renderizado na página', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.queryByRole('link', { name: /about/i });
    expect(linkAbout).toBeDefined();
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se link Favorite Pokémons renderizado na página', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.queryByRole('link', {
      name: /favorite pokémons/i });
    expect(linkFavoritePokemons).toBeDefined();
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa se link inexistente leva a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const pageNotfound = screen.queryByRole('heading',
      { name: /Page requested not found 😭/i });
    expect(pageNotfound).toBeDefined();
  });
});
