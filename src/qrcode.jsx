/**
 * qrcode.jsx - React entry point for the /qrcode page
 *
 * Mounts the business-card QR view to the #root DOM element
 * of qrcode/index.html.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import QrCodeView from './views/QrCodeView.jsx';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<QrCodeView />);
