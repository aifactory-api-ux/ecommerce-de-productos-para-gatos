import React from 'react';
import { tokens } from '../../styles/tokens';

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.spacing.xs }}>
            <button
              onClick={() => onStepChange(index)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: index <= activeStep ? tokens.colors.primary : tokens.colors.border,
                color: index <= activeStep ? tokens.colors.text_on_primary : tokens.colors.text_secondary,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                transition: tokens.motion,
              }}
            >
              {index + 1}
            </button>
            <span style={{ fontSize: 12, color: tokens.colors.text_secondary, textAlign: 'center' }}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                backgroundColor: index < activeStep ? tokens.colors.primary : tokens.colors.border,
                margin: `0 ${tokens.spacing.sm}`,
                transition: tokens.motion,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};