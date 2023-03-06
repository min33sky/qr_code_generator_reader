import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full">
      <div className="flex items-center justify-center py-4">
        <a
          aria-label='Link to "min33sky" Github profile'
          title="Go to Github"
          href="https://github.com/min33sky/qr_code_generator_reader"
          className="text-sm text-white transition-colors hover:text-yellow-300"
          rel="noreferrer noopener"
          target="_blank"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
