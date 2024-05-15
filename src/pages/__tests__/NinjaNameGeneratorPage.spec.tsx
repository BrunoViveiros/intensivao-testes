import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NinjaNameGeneratorPage } from '../NinjaNameGeneratorPage';

const formValueMock = {
  valid: {
    card: '1111111111111111',
    verification: '111',
    expiration: '02/2025',
  },
  invalid: {
    card: '1111',
    verification: '11',
    expiration: '01/0111',
  },
};

const inputNames = {
  cardNumber: /card number/i,
  cardVerification: /card verification value/i,
  cardExpiration: /card expiration date/i,
};

describe('<NinjaNameGeneratorPage />', () => {
  it('renders initial state correctly', () => {
    render(<NinjaNameGeneratorPage />);
    // const form = screen.getByRole('form', { name: 'ninjaNameForm' });
    // const inputs = within(form).getAllByRole('textbox', { value: undefined });
    // const button = within(form).getByRole('button', { name: 'Gerar' });

    const inputs = screen.getAllByRole('textbox', { value: undefined });
    const button = screen.getByRole('button', { name: 'Gerar' });

    expect(inputs).toHaveLength(3);
    expect(button).toBeDisabled();
  });

  describe('keeps the button disabled if any field is empty', () => {
    it('keeps the button disabled if cardNumber field is empty', async () => {
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardVerificationInput = screen.getByRole('textbox', {
        name: inputNames.cardVerification,
      });

      const cardExpirationInput = screen.getByRole('textbox', {
        name: inputNames.cardExpiration,
      });

      const button = screen.getByRole('button', { name: 'Gerar' });

      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.type(cardExpirationInput, formValueMock.valid.expiration);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
    });

    it('keeps the button disabled if cardVerificationValue field is empty', async () => {
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole('textbox', {
        name: inputNames.cardNumber,
      });

      const cardExpirationInput = screen.getByRole('textbox', {
        name: inputNames.cardExpiration,
      });

      const button = screen.getByRole('button', { name: 'Gerar' });

      await user.type(cardNumberInput, formValueMock.valid.card);
      await user.type(cardExpirationInput, formValueMock.valid.expiration);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
    });

    it('keeps the button disabled if cardExpirationDate field is empty', async () => {
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole('textbox', {
        name: inputNames.cardNumber,
      });

      const cardVerificationInput = screen.getByRole('textbox', {
        name: inputNames.cardVerification,
      });

      const button = screen.getByRole('button', { name: 'Gerar' });

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
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole('textbox', {
        name: inputNames.cardNumber,
      });
      const cardVerificationInput = screen.getByRole('textbox', {
        name: inputNames.cardVerification,
      });
      const cardExpirationInput = screen.getByRole('textbox', {
        name: inputNames.cardExpiration,
      });
      const button = screen.getByRole('button', { name: 'Gerar' });

      await user.type(cardNumberInput, formValueMock.invalid.card);
      await user.type(cardVerificationInput, formValueMock.valid.verification);
      await user.type(cardExpirationInput, formValueMock.valid.expiration);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.invalid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.valid.verification
      );
      expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
    });

    it('keeps the button disabled if cardVerificationValue field is invalid', async () => {
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole('textbox', {
        name: inputNames.cardNumber,
      });
      const cardVerificationInput = screen.getByRole('textbox', {
        name: inputNames.cardVerification,
      });
      const cardExpirationInput = screen.getByRole('textbox', {
        name: inputNames.cardExpiration,
      });
      const button = screen.getByRole('button', { name: 'Gerar' });

      await user.type(cardNumberInput, formValueMock.valid.card);
      await user.type(
        cardVerificationInput,
        formValueMock.invalid.verification
      );
      await user.type(cardExpirationInput, formValueMock.valid.expiration);
      await user.keyboard('{Tab}'); //workaround

      expect(button).toBeDisabled();
      expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
      expect(cardVerificationInput).toHaveValue(
        formValueMock.invalid.verification
      );
      expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
    });

    it('keeps the button disabled if cardExpirationDate field is invalid', async () => {
      render(<NinjaNameGeneratorPage />);

      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole('textbox', {
        name: inputNames.cardNumber,
      });
      const cardVerificationInput = screen.getByRole('textbox', {
        name: inputNames.cardVerification,
      });
      const cardExpirationInput = screen.getByRole('textbox', {
        name: inputNames.cardExpiration,
      });
      const button = screen.getByRole('button', { name: 'Gerar' });

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

  it('enables the button when all fields are valid', async () => {
    render(<NinjaNameGeneratorPage />);

    const user = userEvent.setup();

    const cardNumberInput = screen.getByRole('textbox', {
      name: inputNames.cardNumber,
    });
    const cardVerificationInput = screen.getByRole('textbox', {
      name: inputNames.cardVerification,
    });
    const cardExpirationInput = screen.getByRole('textbox', {
      name: inputNames.cardExpiration,
    });
    const button = screen.getByRole('button', { name: 'Gerar' });

    await user.type(cardNumberInput, formValueMock.valid.card);
    await user.type(cardVerificationInput, formValueMock.valid.verification);
    await user.type(cardExpirationInput, formValueMock.valid.expiration);
    await user.keyboard('{Tab}'); //workaround

    expect(button).toBeEnabled();
    expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
    expect(cardVerificationInput).toHaveValue(formValueMock.valid.verification);
    expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
  });

  it('generates a ninja name when the button is clicked', async () => {
    render(<NinjaNameGeneratorPage />);

    const user = userEvent.setup();

    const cardNumberInput = screen.getByRole('textbox', {
      name: inputNames.cardNumber,
    });
    const cardVerificationInput = screen.getByRole('textbox', {
      name: inputNames.cardVerification,
    });
    const cardExpirationInput = screen.getByRole('textbox', {
      name: inputNames.cardExpiration,
    });
    const button = screen.getByRole('button', { name: 'Gerar' });

    await user.type(cardNumberInput, formValueMock.valid.card);
    await user.type(cardVerificationInput, formValueMock.valid.verification);
    await user.type(cardExpirationInput, formValueMock.valid.expiration);
    await user.keyboard('{Tab}'); //workaround
    await user.click(button);

    const ninjaName = await screen.findByTestId('ninja-name');

    expect(ninjaName).toBeInTheDocument();
  });

  it('goes back to the form when back button is clicked', async () => {
    render(<NinjaNameGeneratorPage />);

    const user = userEvent.setup();

    const cardNumberInput = screen.getByRole('textbox', {
      name: inputNames.cardNumber,
    });
    const cardVerificationInput = screen.getByRole('textbox', {
      name: inputNames.cardVerification,
    });
    const cardExpirationInput = screen.getByRole('textbox', {
      name: inputNames.cardExpiration,
    });
    const button = screen.getByRole('button', { name: 'Gerar' });

    await user.type(cardNumberInput, formValueMock.valid.card);
    await user.type(cardVerificationInput, formValueMock.valid.verification);
    await user.type(cardExpirationInput, formValueMock.valid.expiration);
    await user.keyboard('{Tab}'); //workaround
    await user.click(button);

    const backButton = await screen.findByRole('button', { name: 'Voltar' });

    await user.click(backButton);

    const cardNumberInputBack = await screen.findByRole('textbox', {
      name: inputNames.cardNumber,
    });

    expect(cardNumberInputBack).toBeInTheDocument();
  });
});
