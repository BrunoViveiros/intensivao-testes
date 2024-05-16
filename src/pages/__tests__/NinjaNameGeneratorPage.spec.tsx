// import { describe, expect, it } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import { NinjaNameGeneratorPage } from '../NinjaNameGeneratorPage';

// const formValueMock = {
//   valid: {
//     card: '1111111111111111',
//     verification: '111',
//     expiration: '02/2025',
//   },
//   invalid: {
//     card: '1111',
//     verification: '11',
//     expiration: '01/0111',
//   },
// };

// const inputNames = {
//   cardNumber: /card number/i,
//   cardVerification: /card verification value/i,
//   cardExpiration: /card expiration date/i,
// };

// const setup = () => {
//   render(<NinjaNameGeneratorPage />);

//   const user = userEvent.setup();

//   // const form = screen.getByRole('form', { name: 'ninjaNameForm' });

//   const cardNumberInput = screen.getByRole('textbox', {
//     name: inputNames.cardNumber,
//   });
//   const cardVerificationInput = screen.getByRole('textbox', {
//     name: inputNames.cardVerification,
//   });
//   const cardExpirationInput = screen.getByRole('textbox', {
//     name: inputNames.cardExpiration,
//   });
//   const button = screen.getByRole('button', { name: 'Gerar' });

//   return {
//     cardNumberInput,
//     cardVerificationInput,
//     cardExpirationInput,
//     button,
//     user,
//   };
// };

// describe('<NinjaNameGeneratorPage />', () => {
//   it('renders initial state correctly', () => {
//     const {
//       button,
//       cardExpirationInput,
//       cardNumberInput,
//       cardVerificationInput,
//     } = setup();

//     expect(cardExpirationInput).toHaveValue('');
//     expect(cardNumberInput).toHaveValue('');
//     expect(cardVerificationInput).toHaveValue('');
//     expect(button).toBeDisabled();
//   });

//   describe('keeps the button disabled if any field is empty', () => {
//     it('keeps the button disabled if cardNumber field is empty', async () => {
//       const { button, cardExpirationInput, cardVerificationInput, user } =
//         setup();

//       await user.type(cardVerificationInput, formValueMock.valid.verification);
//       await user.type(cardExpirationInput, formValueMock.valid.expiration);
//       await user.keyboard('{Tab}'); //workaround

//       expect(button).toBeDisabled();
//       expect(cardVerificationInput).toHaveValue(
//         formValueMock.valid.verification
//       );
//       expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
//     });

//     it('keeps the button disabled if cardVerificationValue field is empty', async () => {
//       const { button, cardExpirationInput, cardNumberInput, user } = setup();

//       await user.type(cardNumberInput, formValueMock.valid.card);
//       await user.type(cardExpirationInput, formValueMock.valid.expiration);
//       await user.keyboard('{Tab}'); //workaround

//       expect(button).toBeDisabled();
//       expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
//       expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
//     });

//     it('keeps the button disabled if cardExpirationDate field is empty', async () => {
//       const { button, cardVerificationInput, cardNumberInput, user } = setup();

//       await user.type(cardNumberInput, formValueMock.valid.card);
//       await user.type(cardVerificationInput, formValueMock.valid.verification);

//       expect(button).toBeDisabled();
//       expect(cardVerificationInput).toHaveValue(
//         formValueMock.valid.verification
//       );
//       expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
//     });
//   });

//   describe('keeps the button disabled if any field is invalid', () => {
//     it('keeps the button disabled if cardNumber field is invalid', async () => {
//       const {
//         button,
//         cardVerificationInput,
//         cardExpirationInput,
//         cardNumberInput,
//         user,
//       } = setup();

//       await user.type(cardNumberInput, formValueMock.invalid.card);
//       await user.type(cardVerificationInput, formValueMock.valid.verification);
//       await user.type(cardExpirationInput, formValueMock.valid.expiration);
//       await user.keyboard('{Tab}'); //workaround

//       expect(button).toBeDisabled();
//       expect(cardNumberInput).toHaveValue(formValueMock.invalid.card);
//       expect(cardVerificationInput).toHaveValue(
//         formValueMock.valid.verification
//       );
//       expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
//     });

//     it('keeps the button disabled if cardVerificationValue field is invalid', async () => {
//       const {
//         button,
//         cardVerificationInput,
//         cardExpirationInput,
//         cardNumberInput,
//         user,
//       } = setup();

//       await user.type(cardNumberInput, formValueMock.valid.card);
//       await user.type(
//         cardVerificationInput,
//         formValueMock.invalid.verification
//       );
//       await user.type(cardExpirationInput, formValueMock.valid.expiration);
//       await user.keyboard('{Tab}'); //workaround

//       expect(button).toBeDisabled();
//       expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
//       expect(cardVerificationInput).toHaveValue(
//         formValueMock.invalid.verification
//       );
//       expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
//     });

//     it('keeps the button disabled if cardExpirationDate field is invalid', async () => {
//       const {
//         button,
//         cardVerificationInput,
//         cardExpirationInput,
//         cardNumberInput,
//         user,
//       } = setup();

//       await user.type(cardNumberInput, formValueMock.valid.card);
//       await user.type(cardVerificationInput, formValueMock.valid.verification);
//       await user.type(cardExpirationInput, formValueMock.invalid.expiration);
//       await user.keyboard('{Tab}'); //workaround

//       expect(button).toBeDisabled();
//       expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
//       expect(cardVerificationInput).toHaveValue(
//         formValueMock.valid.verification
//       );
//       expect(cardExpirationInput).toHaveValue(formValueMock.invalid.expiration);
//     });
//   });

//   it('enables the button when all fields are valid', async () => {
//     const {
//       button,
//       cardVerificationInput,
//       cardExpirationInput,
//       cardNumberInput,
//       user,
//     } = setup();

//     await user.type(cardNumberInput, formValueMock.valid.card);
//     await user.type(cardVerificationInput, formValueMock.valid.verification);
//     await user.type(cardExpirationInput, formValueMock.valid.expiration);
//     await user.keyboard('{Tab}'); //workaround

//     expect(button).toBeEnabled();
//     expect(cardNumberInput).toHaveValue(formValueMock.valid.card);
//     expect(cardVerificationInput).toHaveValue(formValueMock.valid.verification);
//     expect(cardExpirationInput).toHaveValue(formValueMock.valid.expiration);
//   });

//   it('generates a ninja name when the button is clicked', async () => {
//     const {
//       button,
//       cardVerificationInput,
//       cardExpirationInput,
//       cardNumberInput,
//       user,
//     } = setup();

//     await user.type(cardNumberInput, formValueMock.valid.card);
//     await user.type(cardVerificationInput, formValueMock.valid.verification);
//     await user.type(cardExpirationInput, formValueMock.valid.expiration);
//     await user.keyboard('{Tab}'); //workaround
//     await user.click(button);

//     const ninjaName = await screen.findByTestId('ninja-name');

//     expect(ninjaName).toBeInTheDocument();
//   });

//   it('goes back to the form when back button is clicked', async () => {
//     const {
//       button,
//       cardVerificationInput,
//       cardExpirationInput,
//       cardNumberInput,
//       user,
//     } = setup();

//     await user.type(cardNumberInput, formValueMock.valid.card);
//     await user.type(cardVerificationInput, formValueMock.valid.verification);
//     await user.type(cardExpirationInput, formValueMock.valid.expiration);
//     await user.keyboard('{Tab}'); //workaround
//     await user.click(button);

//     const backButton = await screen.findByRole('button', { name: 'Voltar' });

//     await user.click(backButton);

//     const cardNumberInputBack = await screen.findByRole('textbox', {
//       name: inputNames.cardNumber,
//     });

//     expect(cardNumberInputBack).toBeInTheDocument();
//   });
// });
