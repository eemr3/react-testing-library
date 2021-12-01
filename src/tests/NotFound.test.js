import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading h2 com o texto
   "Page requested not found 😭;"`, () => {
    renderWithRouter(<NotFound />);

    const headingNotFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(headingNotFound).toBeInTheDocument();
  });

  it(`Teste se página mostra a imagem
   "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".`, () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });

    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
