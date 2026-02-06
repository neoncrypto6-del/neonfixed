import React from 'react';

const getRandomBonus = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = Math.floor(Math.random() * 100) + 1; // Random amount between 1 and 100
    return `User ${randomName} has claimed a bonus of $${randomAmount}!`;
};

const NotificationCard = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>Bonus Notification</h3>
            <p>{getRandomBonus()}</p>
        </div>
    );
};

export default NotificationCard;