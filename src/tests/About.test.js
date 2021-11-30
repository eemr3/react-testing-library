import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const paragraphOne = 'This application simulates a Pokédex, a digital';

    renderWithRouter(<About />);
    const contentPageAbout = screen.getAllByText(/p/);
    expect(contentPageAbout[0]).toHaveTextContent(paragraphOne);

    const imagePokedex = screen.getByRole('img', { name: 'Pokédex' });
    expect(imagePokedex).toBeInTheDocument();

    const titleAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(titleAbout).toBeInTheDocument();

    const paragraphs = screen.getAllByText(/p/);
    expect(paragraphs).toHaveLength(2);

    expect(imagePokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
