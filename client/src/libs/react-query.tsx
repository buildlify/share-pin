import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const TestingWrapper = ({ children }: { children: JSX.Element }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
