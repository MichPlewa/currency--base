import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNToUSD = [
  { amount: 100, expected: 'PLN 100.00 = $28.57' },
  { amount: 20, expected: 'PLN 20.00 = $5.71' },
  { amount: 200, expected: 'PLN 200.00 = $57.14' },
];

const testCasesUSDToPLN = [
  { amount: 100, expected: '$100.00 = PLN 350.00' },
  { amount: 200, expected: '$200.00 = PLN 700.00' },
  { amount: 150, expected: '$150.00 = PLN 525.00' },
];

const testCasesPLN = [
  { amount: 100, expected: 'PLN 100.00 = PLN 100.00' },
  { amount: 350, expected: 'PLN 350.00 = PLN 350.00' },
  { amount: 200, expected: 'PLN 200.00 = PLN 200.00' },
];

const testCasesUSD = [
  { amount: 100, expected: '$100.00 = $100.00' },
  { amount: 350, expected: '$350.00 = $350.00' },
  { amount: 200, expected: '$200.00 = $200.00' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  for (let testObj of testCasesPLNToUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }
  for (let testObj of testCasesUSDToPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }
  for (let testObj of testCasesPLN) {
    it('should render proper info about conversion when PLN -> PLN', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }
  for (let testObj of testCasesUSD) {
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }
  it('should return wrong value if amout is < 0', () => {
    render(<ResultBox from="USD" to="PLN" amount={-100} />);

    const output = screen.getByTestId('output-error');

    expect(output).toHaveTextContent('Wrong value...');
  });
});
