import React, { useEffect, useState } from 'react';
import ContributorPresenter from '../components/ContributorPresenter';
import Contributor from './Contributor';

const listOfContributors = [
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D4D35AQFsXBTIzo5T2w/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1720180375072?e=1731852000&v=beta&t=iEyn1pHVKBPwADUB1tRM1dX0sI-pALaNb7QpdZY4ruc', 
        'Shivang Bhavesh Mewada', 
        '22UCS199', 
        'https://www.linkedin.com/in/shivang-mewada-254884250/', 
        'https://github.com/bob',
         'Computer Vision Specialist'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D5603AQHUdn8-AHO4VA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700217867175?e=1736380800&v=beta&t=BtFayzLCZlHCg7FgrO88gF3rJSKh3igh4ZeZgzL7bTI', 
        'Harsh Joshi', 
        '22UCS085', 
        'https://www.linkedin.com/in/harsh-joshi-6a0509257/', 
        'https://github.com/harshjoshi004', 
        'Font-End Developer & Project Designer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D4D03AQGAgfdHzhk1yA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719126296374?e=1736985600&v=beta&t=ViWQzQVjpgXgz-kuCnzgER149vfEJKg-GSKp10L7faA', 
        'Rana Janmejkumar Ashish', 
        '22UCS162', 
        'https://www.linkedin.com/in/janmej-rana-361948230/', 
        'https://github.com/harshjoshi004', 
        'Python & OpenCV Developer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D5603AQHyuLSo-pfxOQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673176582432?e=1736380800&v=beta&t=Wi8YYDw1x-5XMgdlcwDj8Nb-vryAHm5GqpFx7n7UGNM', 
        'Agrawal Mohit Riteshkumar', 
        '22UCS008   ', 
        'https://www.linkedin.com/in/mohit-agrawal-03ba23255/', 
        'https://github.com/bob',
         'ReactJs FrontEnd Developer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D4D03AQEDkUW4Hn1Caw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1693239192673?e=1736380800&v=beta&t=_1o0GfmLnnAfGcYy3iw9_Fz8UdTyuusSn9VQsxU5Shg', 
        'Dudhat Hemil PravinKumar', 
        '22UCS074', 
        'https://www.linkedin.com/in/hemil-dudhat-52ab51265/', 
        'https://github.com/Hemil36',
         'Full-Stack Web Developer (MERN)'
    )
];

const AboutUsPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update the `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                padding: '16px',
                overflowY: 'auto',
                textAlign: 'left',
                height: '100%',
            }}
        >
            <h2
                style={{
                    fontSize: isMobile ? '1.5em' : '2em',
                    color: '#000000',
                    fontWeight: 'bold',
                }}
            >
                About Us
            </h2>

            <p
                style={{
                    color: '#666666',
                    margin: '8px 0',
                    fontSize: isMobile ? '0.9em' : '1em',
                    lineHeight: isMobile ? '1.4' : '1.6',
                }}
            >
                We are a team formed for the Integrated Software Development Lab project, bringing together our diverse skills to achieve a common goal.
                <br />Our collaboration has allowed us to learn from each other and apply our knowledge in practical scenarios, contributing to the successful completion of this project.
            </p>

            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
                    flexWrap: 'wrap',
                    marginTop: '16px',
                    gap: '16px',
                }}
            >
                {listOfContributors.map((contributor, index) => (
                    <ContributorPresenter key={index} contributor={contributor} />
                ))}
            </div>
        </div>
    );
};

export default AboutUsPage;

