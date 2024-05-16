import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

import { makeNinjaNameExamplesTab } from '../../../../pages/NinjaNamePage/tabs/NinjaNameExamplesTab';

const NAMES_EXAMPLES = [
  { id: '1', name: 'one' },
  { id: '2', name: 'two' },
  { id: '3', name: 'three' },
  { id: '4', name: 'four' },
];

describe('<NinjaNameExamplesTab />', () => {
  describe("when it's generating the examples", () => {
    it('shows a spinner', () => {
      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: undefined,
          isFetching: true,
          ninjaNames: undefined,
          refetch: () => undefined,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const spinner = screen.getByRole('img', { name: 'loading' });

      expect(spinner).toBeVisible();
    });
  });

  describe('when it has an error when generating the name', () => {
    it('shows an error', () => {
      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: 'error',
          isFetching: false,
          ninjaNames: undefined,
          refetch: () => undefined,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const error = screen.getByTestId('ninja-names-list-error');

      expect(error).toBeVisible();
    });

    it('shows a button to go back', () => {
      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: 'error',
          isFetching: false,
          ninjaNames: undefined,
          refetch: () => undefined,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const button = screen.getByRole('button', { name: /recarregar/i });

      expect(button).toBeVisible();
    });

    it('the button refetch the examples', async () => {
      const refetch = vi.fn();

      const user = userEvent.setup();

      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: 'error',
          isFetching: false,
          ninjaNames: undefined,
          refetch: refetch,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const button = screen.getByRole('button', { name: /recarregar/i });

      await user.click(button);

      expect(refetch).toHaveBeenCalledOnce();
    });
  });

  describe('when the examples are generated', () => {
    it('shows the examples list', () => {
      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: undefined,
          isFetching: false,
          ninjaNames: NAMES_EXAMPLES,
          refetch: () => undefined,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const list = screen.getByRole('list');

      NAMES_EXAMPLES.forEach(({ id, name }) => {
        const listItem = within(list).getByTestId(`ninja-name-example-${id}`);
        expect(listItem).toHaveTextContent(name);
      });
    });

    it('shows a button to go back', () => {
      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: undefined,
          isFetching: false,
          ninjaNames: NAMES_EXAMPLES,
          refetch: () => undefined,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const button = screen.getByRole('button', { name: /recarregar/i });

      expect(button).toBeVisible();
    });

    it('the button refetch the list', async () => {
      const user = userEvent.setup();
      const refetch = vi.fn();

      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: undefined,
          isFetching: false,
          ninjaNames: NAMES_EXAMPLES,
          refetch: refetch,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const button = screen.getByRole('button', { name: /recarregar/i });

      await user.click(button);

      expect(refetch).toHaveBeenCalledOnce();
    });
  });

  describe('when auto-reload is checked', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('reloads the examples every five seconds', async () => {
      const user = userEvent.setup({
        advanceTimers: (ms) => vi.advanceTimersByTime(ms),
      });

      const refetch = vi.fn();

      const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
        useNinjaNames: () => ({
          error: undefined,
          isFetching: false,
          ninjaNames: NAMES_EXAMPLES,
          refetch: refetch,
        }),
      });

      render(<NinjaNameExamplesTab />);

      const checkbox = screen.getByRole('checkbox', {
        name: /auto-recarregar/i,
      });

      expect(refetch).not.toHaveBeenCalled();

      await user.click(checkbox);

      vi.advanceTimersByTime(5000);

      expect(refetch).toHaveBeenCalledOnce();

      vi.advanceTimersByTime(5000);

      expect(refetch).toHaveBeenCalledTimes(2);
    });
  });
});
