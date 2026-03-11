/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Home from './components/Home';
import Checkout from './components/Checkout';

export default function App() {
  const [page, setPage] = useState<'home' | 'checkout'>('home');

  return (
    <>
      {page === 'home' ? (
        <Home onBuy={() => setPage('checkout')} />
      ) : (
        <Checkout onBack={() => setPage('home')} />
      )}
    </>
  );
}
