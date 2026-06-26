import { useState } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'agent', text: 'Welcome to divineTEK! How can we help you today?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatLog([...chatLog, { sender: 'user', text: message }]);
    setMessage('');
    
    // Simulate auto-reply
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'agent', text: "Thanks for reaching out! A representative will be with you shortly." }]);
    }, 1000);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">dT</div>
              <div>
                <h4>divineTEK Support</h4>
                <span>Typically replies in a few minutes</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {chatLog.map((msg, i) => (
              <div key={i} className={`chat-bubble-wrap ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <form className="chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
      <button className={`chat-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Chat">
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
}
