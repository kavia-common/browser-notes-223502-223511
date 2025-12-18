import React from 'react';

/**
 * Header for the Browser Notes app.
 * Displays the app title and accent underline.
 */
// PUBLIC_INTERFACE
export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <h1 className="header-title">Browser Notes</h1>
        <div className="header-underline" />
      </div>
    </header>
  );
}
