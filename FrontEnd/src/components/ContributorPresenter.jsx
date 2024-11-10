// ContributorPresenter.jsx
import React, { useEffect, useState } from 'react';

// You can import icons from a library like Font Awesome, or use SVGs directly.
// Here, I'll use placeholders for the icons.
const LinkedInIcon = () => (
    <img src="https://th.bing.com/th/id/R.d374b1a974d1afcf8633c39108cbb827?rik=LU%2fOEQFe%2biI3RA&riu=http%3a%2f%2fwww.vhv.rs%2ffile%2fmax%2f8%2f80784_linkedin-logo-white-png.png&ehk=6uznLrX%2fFvkj2I%2bSlCKp8U6qVBIm0njhPWbh05GQaE4%3d&risl=&pid=ImgRaw&r=0" alt="LinkedIn" style={{ 
        width: '20px', 
        height: '20px', 
        filter: 'invert(1)' // Inverts the colors to make the icon black
    }}  />
);

const GitHubIcon = () => (
    <img src="https://pngimg.com/uploads/github/github_PNG80.png" alt="GitHub" style={{ 
        width: '20px', 
        height: '20px', 
        filter: 'invert(1)' // Inverts the colors to make the icon black
    }}  />
);

const ContributorPresenter = ({ contributor }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: isMobile ? '12px' : '16px', // Adjust padding on mobile
            textAlign: 'center',
            width: isMobile ? '100%' : 'calc(30% - 16px)', // Full width on mobile, 30% on larger screens
            maxWidth: '250px',
            margin: isMobile ? '8px auto' : '0', // Center the card on mobile
            boxSizing: 'border-box',
        }}>
            <img src={contributor.imagePath} alt={contributor.name} style={{
                width: isMobile ? '80px' : '100px', // Smaller image on mobile
                height: isMobile ? '80px' : '100px', 
                borderRadius: '50%', // Circular image
                objectFit: 'cover',
                margin: '0 auto', // Center the image
                display: 'block', // Ensures margin auto works for block elements
            }} />
            <h3 style={{
                fontSize: isMobile ? '1em' : '1.2em', // Adjust font size on mobile
                color: '#000000', // Pitch black color for the name
                fontWeight: 'bold', // Make the name bold
                margin: '4px 0', // Space around the name
            }}>
                {contributor.name}
            </h3>
            <p style={{ 
                margin: '4px 0', 
                color: '#666666' // Medium grey for the roll number
            }}>
                {contributor.rollNum}
            </p> 
            <p style={{ 
                margin: '4px 0', 
                color: '#666666' // Lighter grey for the role
            }}>
                {contributor.role}
            </p>
            <div style={{
                display: 'flex',
                justifyContent: 'center', // Center the icons
                flexWrap: isMobile ? 'wrap' : 'nowrap', // Wrap on mobile for better alignment
            }}>
                <a href={contributor.linkedInUrl} target="_blank" rel="noopener noreferrer" style={{
                    padding: '8px',
                    margin: '8px 4px',
                    backgroundColor: '#0077b5', // LinkedIn button color
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: isMobile ? '0.9em' : '1em' // Slightly smaller font on mobile
                }}>
                    <LinkedInIcon />
                </a>
                <a href={contributor.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                    padding: '8px',
                    margin: '8px 4px',
                    backgroundColor: '#333', // GitHub button color
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: isMobile ? '0.9em' : '1em' // Slightly smaller font on mobile
                }}>
                    <GitHubIcon />
                </a>
            </div>
        </div>
    );
};

export default ContributorPresenter;