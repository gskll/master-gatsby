import React, { forwardRef } from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value == '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

function PriceInput({ type, value, onChange, forwardedRef }) {
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        ref={forwardedRef}
        value={value}
        onChange={(e) => onChange(createPatchFrom(e.target.value))}
      />
    </div>
  );
}

// Sanity accessibility
PriceInput.focus = function () {
  this._inputElement.focus();
};

export default forwardRef((props, ref) => (
  <PriceInput {...props} forwardedRef={ref} />
));
