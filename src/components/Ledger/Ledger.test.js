import React from 'react';
import { render } from '@testing-library/react';
import Ledger from './';

test('it should have an account with formatted amounts', () => {
  const testProps = [
    {
      _id: "1234",
      name: "Test acct 1",
      onlineBalance: 100,
      registerBalance: 200,
    }
  ];
  const { getByText } = render(<Ledger accounts={testProps} />);
  const acctElement = getByText(/Test acct 1/i);
  const onlineElement = getByText('$100.00');
  const registerElement = getByText('$200.00');
  expect(acctElement).toBeInTheDocument();
  expect(onlineElement).toBeInTheDocument();
  expect(registerElement).toBeInTheDocument();
});
