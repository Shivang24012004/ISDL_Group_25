import React from 'react';
import ContributorPresenter from '../components/ContributorPresenter';
import Contributor from './Contributor';

const listOfContributors = [
    new Contributor(
        'https://flufi.me/_next/image?url=https%3A%2F%2Fflufi-cdn.com%2Finstagram%2FU2FsdGVkX18A9LwZnw55d3Fr9dMOpCRD%2BbNlAe%2BofakBbttMdzlqRcqlsBCwlXdTWzph%2Bbn3OdB1QrUpOYXw5yC2%2BBaQrbqmgl8BqK9mAF1V5v6E0LlDMsOSAyHXoZ52gSy68fF5ElVo0uHZ0BWrpxsQxw7qC4pxpbjVnV6kq5Y%3D&w=128&q=75', 
        'Shivang Bhavesh Mewada', 
        '22UCS199', 
        'https://www.linkedin.com/in/shivang-mewada-254884250/', 
        'https://github.com/bob',
         'OpenCV and Image Processing Engineer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D5603AQHUdn8-AHO4VA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700217867175?e=1736380800&v=beta&t=BtFayzLCZlHCg7FgrO88gF3rJSKh3igh4ZeZgzL7bTI', 
        'Harsh Joshi', 
        '22UCS085', 
        'https://www.linkedin.com/in/harsh-joshi-6a0509257/', 
        'https://github.com/harshjoshi004', 
        'Font-End Developer (ReactJs) & Project Designer'
    ),
    new Contributor(
        'https://flufi.me/_next/image?url=https%3A%2F%2Fflufi-cdn.com%2Finstagram%2FU2FsdGVkX19H4zPoMIu9RKnwFxFzKDELMH%2BbnKy%2FHomyiVohng%2BAdjxvqqgtqo%2F6xEoR6lMFoDAXhDxfFoe0pGjqA6NQO1QmuvHLsL3GoEDxEgSb8Lx9SuLhg5m3m04Aa1mdJVwAqiwLHYOhxV7VQ7Icl%2BCWJdialqHCynzzMbg%3D&w=128&q=75', 
        'Rana Janmejkumar Ashish', 
        '22UCS162', 
        'https://www.linkedin.com/in/janmej-rana-361948230/', 
        'https://github.com/harshjoshi004', 
        'Python Developer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D5603AQHyuLSo-pfxOQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673176582432?e=1736380800&v=beta&t=Wi8YYDw1x-5XMgdlcwDj8Nb-vryAHm5GqpFx7n7UGNM', 
        'Agrawal Mohit Riteshkumar', 
        '22UCS008   ', 
        'https://www.linkedin.com/in/mohit-agrawal-03ba23255/', 
        'https://github.com/bob',
         'Frontend Developer'
    ),
    new Contributor(
        'https://media.licdn.com/dms/image/v2/D4D03AQEDkUW4Hn1Caw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1693239192673?e=1736380800&v=beta&t=_1o0GfmLnnAfGcYy3iw9_Fz8UdTyuusSn9VQsxU5Shg', 
        'Dudhat Hemil PravinKumar', 
        '22UCS074', 
        'https://www.linkedin.com/in/shivang-mewada-254884250/', 
        'https://github.com/Hemil36',
         'Full-Stack Web Developer (MERN)'
    )
];

const AboutUsPage = () => {
    return (
        <div className="p-8 overflow-auto text-left">

            <h2 style={{ fontSize: '2em', color: '#000000', fontWeight: 'bold' }}>About Us</h2> {/* Added heading */}

            <p style={{ color: '#666666', margin: '8px 0' }}>
                We are a team formed for the Integrated Software Development Lab project, bringing together our diverse skills to achieve a common goal. 
                <br/>Our collaboration has allowed us to learn from each other and apply our knowledge in practical scenarios, contributing to the successful completion of this project.
            </p>


            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '16px 0 0', // Margin only at the top (top, right, bottom, left)
                gap: '16px', // Space between cards
            }}>
                {listOfContributors.map((contributor, index) => (
                    <ContributorPresenter key={index} contributor={contributor} />
                ))}
            </div>
        </div>
    );
};

export default AboutUsPage;
