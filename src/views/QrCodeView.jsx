import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const SITE_URL = 'https://allmonty.github.io';

export default function QrCodeView() {
    return (
        <div className="app-shell qr-card">
            <p className="eyebrow">Scan to visit</p>
            <h1>Allmonty</h1>
            <p className="muted">Allan Monteiro · Programmer</p>
            <div className="qr-card__code">
                {/* Dark modules on a light background so any camera can scan it */}
                <QRCodeSVG
                    value={SITE_URL}
                    level="M"
                    marginSize={2}
                    bgColor="#e8e6e1"
                    fgColor="#0f0e0a"
                    title="QR code for allmonty.github.io"
                />
            </div>
            <a className="text-link" href="/">allmonty.github.io</a>
        </div>
    );
}
