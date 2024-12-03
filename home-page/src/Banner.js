import React from 'react';
import './Button.css';

const Banner = () => {
    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            color: '#000',
            padding: '10px',
            textAlign: 'left',
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '30px',
            zIndex: '1000',
            backdropFilter: 'blur(5px)',
        }}>
            <button className="search-button">Search
            </button>
        </div>
    )
};

export default Banner;