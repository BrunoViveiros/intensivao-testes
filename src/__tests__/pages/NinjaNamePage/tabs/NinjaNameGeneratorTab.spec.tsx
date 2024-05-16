import { describe, expect, it, vi } from 'vitest';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import { Screen, queries, render, screen } from '@testing-library/react';

import { makeNinjaNameGeneratorTab } from '../../../../pages/NinjaNamePage/tabs/NinjaNameGeneratorTab';

const NINJA_NAME = 'Iburi Iburu';

const formValueMock = {
  valid: {
    card: '1111111111111111',
    verification: '111',
    expiration: dayjs().add(1, 'year').set('date', 1).format('MM/DD/YYYY'),
  },
  invalid: {
    card: '1111',
    verification: '11',
    expiration: '01/0111',
  },
};

const formQueries = (currentScreen: Screen<typeof queries>) => {
  const cardNumberInput = currentScreen.getByRole('textbox', {
    name: /card number/i,
  });
  const cardVerificationInput = currentScreen.getByRole('textbox', {
    name: /card verification value/i,
  });
  const cardExpirationInput = currentScreen.getByRole('textbox', {
    name: /card expiration date/i,
  });
  const button = currentScreen.getByRole('button', { name: 'Gerar' });

  return {
    cardNumberInput,
    cardVerificationInput,
    cardExpirationInput,
    button,
  };
};

describe('<NinjaNameGeneratorTab />', () => {
  describe('when the form is submitted', () => {
    it('generates a new name', async () => {
      const user = userEvent.setup();
      const generateNinjaName = vi.fn();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: generateNinjaName,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const {
        button,
        cardVerificationInput,
        cardExpirationInput,
        cardNumberInput,
      } = formQueries(screen);

      await user.type(cardNumberInput, formValueMock.valid.card);
      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.keyboard('{Tab}'); //workaround
      await user.click(button);

      expect(generateNinjaName).toHaveBeenCalledOnce();
      expect(generateNinjaName).toHaveBeenCalledWith({
        cardExpirationDate: dayjs(formValueMock.valid.expiration).toISOString(),
        cardNumber: formValueMock.valid.card,
        cardVerificationValue: formValueMock.valid.verification,
      });
    });
  });

  describe("when it's generating the name", () => {
    it('shows a spinner', () => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: true,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const spinner = screen.getByRole('img', { name: 'loading' });

      expect(spinner).toBeVisible();
    });
  });

  describe('when it has an error when generating the name', () => {
    it('shows an error', () => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: 'error',
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const error = screen.getByTestId('ninja-name-generation-error');

      expect(error).toBeVisible();
    });

    it('shows a button to go back', () => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: 'error',
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const button = screen.getByRole('button', { name: /voltar/i });

      expect(button).toBeVisible();
    });

    it('the button reset the form', async () => {
      const user = userEvent.setup();
      const reset = vi.fn();
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: 'error',
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: reset,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const button = screen.getByRole('button', { name: /voltar/i });

      await user.click(button);

      expect(reset).toHaveBeenCalledOnce();
    });
  });

  describe('when the name is generated', () => {
    it('shows the name', () => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: NINJA_NAME,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const ninjaName = screen.getByTestId('ninja-name');

      expect(ninjaName).toHaveTextContent(NINJA_NAME);
    });

    it('shows a button to go back', () => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: NINJA_NAME,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const button = screen.getByRole('button', { name: /voltar/i });

      expect(button).toBeVisible();
    });

    it('the button reset the form', async () => {
      const user = userEvent.setup();
      const reset = vi.fn();
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: NINJA_NAME,
          reset: reset,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const button = screen.getByRole('button', { name: /voltar/i });

      await user.click(button);

      expect(reset).toHaveBeenCalledOnce();
    });
  });
});
