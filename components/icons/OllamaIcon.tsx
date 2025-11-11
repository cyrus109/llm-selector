import React from 'react';

const OllamaIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.5 8.5a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 001.5 1.5h7a1.5 1.5 0 001.5-1.5v-4a1.5 1.5 0 00-1.5-1.5h-7zM10 10h4v4h-4v-4z" />
    </svg>
);

export default OllamaIcon;
