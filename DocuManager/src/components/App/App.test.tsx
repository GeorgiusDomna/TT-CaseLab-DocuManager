import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('App render header for Categories', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('Navigation-title')).toBeInTheDocument();
  });

  it('App render SideBar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('SideBar')).toBeInTheDocument();
  });

  it('renders content for the default route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('ContentBlock')).toBeInTheDocument();
    });
  });

  it('renders content for the /categories/:id route', async () => {
    render(
      <MemoryRouter initialEntries={['/categories/other']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('ContentBlock')).toBeInTheDocument();
    });
  });

  it('renders content for the /trash route', async () => {
    render(
      <MemoryRouter initialEntries={['/trash']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('ContentBlock')).toBeInTheDocument();
    });
  });
});
