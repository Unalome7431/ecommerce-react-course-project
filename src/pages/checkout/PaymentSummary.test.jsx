import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import axios from 'axios'
import { PaymentSummary } from './PaymentSummary'

vi.mock('axios')

describe('PaymentSummary component', () => {
  let loadCart
  let paymentSummary
  let user

  beforeEach(() => {
    user = userEvent.setup()
    loadCart = vi.fn()
    paymentSummary = {
      "totalItems": 4,
      "productCostCents": 8268,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 8268,
      "taxCents": 827,
      "totalCostCents": 9095
    }
  })

  it('validate each payment summary row by checking text content of the parent container', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCartItems={loadCart}/>
      </MemoryRouter>
    )
    const paymentSummaryContainer = screen.getByTestId('payment-summary-container')

    expect(paymentSummaryContainer).toHaveTextContent('4')
    expect(paymentSummaryContainer).toHaveTextContent('$82.68')
    expect(paymentSummaryContainer).toHaveTextContent('$0.00')
    expect(paymentSummaryContainer).toHaveTextContent('$8.27')
    expect(paymentSummaryContainer).toHaveTextContent('$90.95')
  })

  it('validate each payment summary row by checking the text of the chosen testId', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCartItems={loadCart}/>
      </MemoryRouter>
    )
    const totalItems = screen.getByTestId('total-items')
    const productCostCents = screen.getByTestId('product-cost-cents')
    const shippingCostCents = screen.getByTestId('shipping-cost-cents')
    const totalCostBeforeTaxCents = screen.getByTestId('total-cost-before-tax-cents')
    const taxCents = screen.getByTestId('tax-cents')
    const totalCostCents = screen.getByTestId('total-cost-cents')

    expect(within(totalItems).getByText('Items (4):')).toBeInTheDocument()
    expect(within(productCostCents).getByText('$82.68')).toBeInTheDocument()
    expect(within(shippingCostCents).getByText('$0.00')).toBeInTheDocument()
    expect(within(totalCostBeforeTaxCents).getByText('$82.68')).toBeInTheDocument()
    expect(within(taxCents).getByText('$8.27')).toBeInTheDocument()
    expect(within(totalCostCents).getByText('$90.95')).toBeInTheDocument()
  })

  it('clicking place order button', async () => {
    function Location() {
      const location = useLocation()
      return <div data-testid="url-path">{location.pathname}</div>
    }
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCartItems={loadCart}/>
        <Location />
      </MemoryRouter>
    )
    const placeOrderButton = screen.getByTestId('place-order-button')

    await user.click(placeOrderButton)
    expect(axios.post).toHaveBeenCalledWith('/api/orders')
    expect(loadCart).toHaveBeenCalled()
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders')
  })
})