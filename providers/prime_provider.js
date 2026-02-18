'use client';

import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";



export default function PrimeProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}
