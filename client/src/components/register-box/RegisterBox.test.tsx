import { describe, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import LoginBox from './RegisterBox';
import { useAuthApi } from '../../hooks';

const useVerifyEmailMock = vi.spyOn(useAuthApi, 'useVerifyEmail');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('LoginBox Component', () => {
  describe('When page is loaded', () => {
    it('should render proper elements and button should not be disabled', () => {
      useVerifyEmailMock.mockImplementation(() => {
        return { mutate: vi.fn(), isLoading: false };
      });
      render(<LoginBox />);
      const loginText = screen.getByText(/Login/i);
      const emailInput = screen.getByPlaceholderText(/enter email/i);
      const button = screen.getByText(/next/i);

      expect(loginText).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });
  describe('When mutating data', () => {
    it('should disable the button', () => {
      useVerifyEmailMock.mockImplementation(() => {
        return { mutate: vi.fn(), isLoading: true };
      });

      render(<LoginBox />);
      const button = screen.getByText(/next/i);
      expect(button).toBeDisabled();
    });
  });
});
