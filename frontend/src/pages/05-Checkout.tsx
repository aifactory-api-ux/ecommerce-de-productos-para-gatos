import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Stepper } from '../components/ui/Stepper';
import { Card, CardContent } from '../components/ui/Card';

const STEPS = [{ label: 'Shipping' }, { label: 'Payment' }, { label: 'Review' }];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setActiveStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop</div>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Checkout</h1>

        <Stepper steps={STEPS} activeStep={activeStep} onStepChange={setActiveStep} />

        <Card style={{ marginTop: tokens.spacing.xl }}>
          <CardContent>
            {activeStep === 0 && (
              <div>
                <h2 style={{ marginTop: 0 }}>Shipping Address</h2>
                <div style={{ display: 'grid', gap: tokens.spacing.md }}>
                  <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} label="Full Name" required />
                  <Input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} label="Address Line 1" required />
                  <Input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} label="Address Line 2" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
                    <Input type="text" name="city" value={formData.city} onChange={handleChange} label="City" required />
                    <Input type="text" name="state" value={formData.state} onChange={handleChange} label="State" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
                    <Input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} label="Postal Code" required />
                    <Input type="text" name="country" value={formData.country} onChange={handleChange} label="Country" required />
                  </div>
                  <Input type="text" name="phone" value={formData.phone} onChange={handleChange} label="Phone" required />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <h2 style={{ marginTop: 0 }}>Payment Method</h2>
                <div style={{ display: 'grid', gap: tokens.spacing.md }}>
                  <Input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} label="Card Number" placeholder="1234 5678 9012 3456" required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
                    <Input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} label="Expiry Date" placeholder="MM/YY" required />
                    <Input type="text" name="cvv" value={formData.cvv} onChange={handleChange} label="CVV" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h2 style={{ marginTop: 0 }}>Order Review</h2>
                <p>Please review your order details before placing the order.</p>
                <div style={{ backgroundColor: tokens.colors.background, padding: tokens.spacing.md, borderRadius: tokens.radii.md }}>
                  <p><strong>Shipping to:</strong> {formData.fullName || 'Not provided'}</p>
                  <p><strong>Address:</strong> {formData.addressLine1 || 'Not provided'}, {formData.city || ''} {formData.postalCode || ''}</p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: tokens.spacing.md, marginTop: tokens.spacing.xl }}>
              {activeStep > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
              {activeStep < STEPS.length - 1 ? (
                <Button variant="primary" onClick={handleNext}>Continue</Button>
              ) : (
                <Button variant="primary" onClick={() => alert('Order placed successfully!')}>Place Order</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}