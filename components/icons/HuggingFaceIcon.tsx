import React from 'react';

const HuggingFaceIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.93,13.2a1,1,0,0,0-1.53.8,5.4,5.4,0,0,1-10.8,0,1,1,0,0,0-1.53-.8A7.4,7.4,0,0,0,12,21a7.4,7.4,0,0,0,8.93-7.8Z" />
        <path d="M7.07,9.13a1,1,0,0,0,1.41,0,2.12,2.12,0,1,1,2.83,2.83,1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0,2.12,2.12,0,1,1,2.83-2.83,1,1,0,1,0-1.41-1.41,2.12,2.12,0,0,1-2.83-2.83,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0,2.12,2.12,0,0,1-2.83,2.83A1,1,0,0,0,7.07,9.13Z" />
    </svg>
);

export default HuggingFaceIcon;
