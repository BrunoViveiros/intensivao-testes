import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';

import { useCardForm } from '../../hooks/useCardForm';

describe('useCardForm', () => {
  // - When we set any of the fields is invalid, it returns `isValid` as false
  it('renders initial state correctly ', () => {
    const { result } = renderHook(() => useCardForm());

    expect(result.current.cardExpirationDate).toBe(null);
    expect(result.current.cardNumber).toBe('');
    expect(result.current.cardVerificationValue).toBe('');
  });

  it('filters non-digits from card number', () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardNumber('123-456.');
    });

    expect(result.current.cardNumber).toBe('123456');
  });

  it('limits the card number to 16 characters', () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardNumber('12345678901234567890');
    });

    expect(result.current.cardNumber).toBe('1234567890123456');
  });

  it('filters non-digits from card verification value', () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardVerificationValue('1.2-3');
    });

    expect(result.current.cardVerificationValue).toBe('123');
  });

  it('limits the card number to 3 characters', () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardVerificationValue('12345678901234567890');
    });

    expect(result.current.cardVerificationValue).toBe('123');
  });

  it('sets isValid as true if all fields are valid', () => {
    const { result } = renderHook(() => useCardForm());
    const expirationDate = dayjs().add(1, 'year');

    act(() => {
      result.current.setCardNumber('1234567890123456');
      result.current.setCardVerificationValue('123');
      result.current.setCardExpirationDate(expirationDate);
    });

    expect(result.current.isValid).toBe(true);
  });

  it('sets isValid as false if any field are invalid', () => {
    const { result } = renderHook(() => useCardForm());
    const expirationDate = dayjs().subtract(1, 'year');

    act(() => {
      result.current.setCardNumber('1234567890123456');
      result.current.setCardVerificationValue('123');
      result.current.setCardExpirationDate(expirationDate);
    });

    expect(result.current.isValid).toBe(false);
  });
});
