import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [posts, setPosts] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cards]);

  const addCard = () => {
    const usedIds = new Set(cards.map(card => card.id));
    const nextPost = posts.find(post => !usedIds.has(post.id));
    if (nextPost) {
      setCards([...cards, { id: nextPost.id, text: nextPost.body }]);
    } else {
      alert('No more posts to add.');
    }
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const gradients = [
    "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
    "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  ];

  return (
    <div className='main'>
      <div className='card-container'>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            onDelete={deleteCard}
            background={gradients[index % gradients.length]}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <button className='add-btn-fixed' onClick={addCard}>Read Post</button>
    </div>
  );
};

export default App;
