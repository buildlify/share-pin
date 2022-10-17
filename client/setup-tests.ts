import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// extend jsdom matchers for vitest
expect.extend(matchers);
