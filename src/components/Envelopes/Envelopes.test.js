import React from 'react';
import { render } from '@testing-library/react';
import Envelopes from './';

test('it should have an envelope with a formatted amount', () => {
  const testProps = [
    {
      _id: "1234",
      name: "Test envelope",
      amount: 10,
    }
  ];
  const { getByText } = render(<Envelopes envelopes={testProps} />);
  const envElement = getByText(/Test envelope/i);
  const amountElement = getByText('$10.00');
  expect(envElement).toBeInTheDocument();
  expect(amountElement).toBeInTheDocument();
});