import Auth from '../Auth'
import { render, screen } from '@testing-library/react';

it('renders welcome message', () => {
    render(<Auth />);
    expect(screen.getByText('Orka')).toBeInTheDocument();
});