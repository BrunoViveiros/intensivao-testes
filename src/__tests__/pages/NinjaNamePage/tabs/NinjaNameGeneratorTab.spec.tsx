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
  it('renders initial state correctly', () => {
    const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
      useGenerateNinjaName: () => ({
        isGenerating: false,
        error: undefined,
        generateNinjaName: async () => undefined,
        ninjaName: undefined,
        reset: () => undefined,
      }),
    });

    render(<NinjaNameGeneratorTab />);

    const {
      button,
      cardExpirationInput,
      cardNumberInput,
      cardVerificationInput,
    } = formQueries(screen);

    expect(cardExpirationInput).toHaveValue('');
    expect(cardNumberInput).toHaveValue('');
    expect(cardVerificationInput).toHaveValue('');
    expect(button).toBeDisabled();
  });

  describe('keeps the button disabled if any field is empty', () => {
    it('keeps the button disabled if cardNumber field is empty', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const { button, cardExpirationInput, cardVerificationInput } =
        formQueries(screen);

      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
    });

    it('keeps the button disabled if cardVerificationValue field is empty', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const { button, cardExpirationInput, cardNumberInput } =
        formQueries(screen);

      await user.type(cardNumberInput, formValueMock.valid.card);
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardExpirationInput).toHaveValue(
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
    });

    it('keeps the button disabled if cardExpirationDate field is empty', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
          ninjaName: undefined,
          reset: () => undefined,
        }),
      });

      render(<NinjaNameGeneratorTab />);

      const { button, cardVerificationInput, cardNumberInput } =
        formQueries(screen);

      await user.type(cardNumberInput, formValueMock.valid.card);
      await user.type(cardVerificationInput, formValueMock.valid.verification);

      expect(button).toBeDisabled();
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
    });
  });

  describe('keeps the button disabled if any field is invalid', () => {
    it('keeps the button disabled if cardNumber field is invalid', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
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

      await user.type(cardNumberInput, formValueMock.invalid.card);
      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.invalid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
    });

    it('keeps the button disabled if cardVerificationValue field is invalid', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
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
      await user.type(
        cardVerificationInput,
        formValueMock.invalid.verification
      );
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.invalid.verification
      );
      expect(cardExpirationInput).toHaveValue(
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
    });

    it('keeps the button disabled if cardExpirationDate field is invalid', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
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
      await user.type(cardExpirationInput, formValueMock.invalid.expiration);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(formValueMock.invalid.expiration);
    });
  });

  describe('when all fields are valid', () => {
    it('enables the button', async () => {
      const user = userEvent.setup();

      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName: () => ({
          isGenerating: false,
          error: undefined,
          generateNinjaName: async () => undefined,
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
      await user.type(
        cardExpirationInput,
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeEnabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(
        dayjs(formValueMock.valid.expiration).format('MM/YYYY')
      );
    });

    it('generates a new name when the form is submitted', async () => {
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
