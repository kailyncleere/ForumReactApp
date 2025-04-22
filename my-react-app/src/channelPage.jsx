import { useState, useEffect, useRef } from 'react';
import './channelPage.css';


let globalMessageId = 1;

function ChannelPage({ id, channelName, posts }) {
    const [messages, setMessages] = useState(posts || []);
    const [input, setInput] = useState('');
    const postInputRef = useRef(null);

    const storageKey = `messages_channel_${id}`;

    useEffect(() => {
        postInputRef.current?.focus();
    }, []);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem(storageKey));
        if (storedMessages && Array.isArray(storedMessages)) {
            setMessages(storedMessages);
        }
    }, [id]);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(messages));
        }
    }, [messages, storageKey]);

    useEffect(() => {
        if (posts && Array.isArray(posts)) {
            setMessages(posts);
        } else {
            setMessages([]);
        }
    }, [id, posts]);

    const addMessage = () => {
        if (input.trim() === '') {
            alert('Please enter a message');
            return;
        }
        const newMessage = {
            id: globalMessageId++,
            text: input,
            author: 'Kailyn',
            replies: [],
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    const addReply = (parentId, replyText) => {
        const updatedMessages = messages.map((message) => {
            if (message.id === parentId) {
                return {
                    ...message,
                    replies: [
                        ...message.replies,
                        { id: globalMessageId++, text: replyText, author: 'Kailyn' },
                    ],
                };
            }
            return message;
        });
        setMessages(updatedMessages);
    };

    return (
        <div className="channelBackground">
            <h2 className="channelName">{channelName || `Channel #${id}`}</h2>
            <div className="channelForm">
                <input
                    ref={postInputRef}
                    type="text"
                    placeholder="What's the buzz?"
                    required
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addMessage();
                        }
                    }}
                />
                <button className="postBttn" onClick={addMessage}>
                    Post
                </button>
            </div>
            {messages.length === 0 ? (
                <p><strong>Chime in fur real!</strong></p>
            ) : (
                <div>
                    <MessageList messages={messages} addReply={addReply} />
                </div>
            )}
        </div>
    );

    function MessageList({ messages, addReply, level = 0 }) {
        return (
            <div>
                {messages.map((message) => (
                    <MessageItem key={message.id} message={message} addReply={addReply} level={level} />
                ))}
            </div>
        );
    }

    function MessageItem({ message, addReply, level }) {
        const [replyInput, setReplyInput] = useState('');
        const [showReplyInput, setShowReplyInput] = useState(false);

        const handleReply = () => {
            if (replyInput.trim() === '') {
                alert('Please write a reply');
                return;
            }
            addReply(message.id, replyInput);
            setReplyInput('');
            setShowReplyInput(false);
        };

        return (
            <div
                className={`messageItem ${level % 2 === 0 ? 'level-even' : 'level-odd'}`}
                style={{ '--level': level }}
            >
                <strong>{message.author}:</strong> {message.text}
                <button className="replyBttn" onClick={() => setShowReplyInput(!showReplyInput)}>
                    Reply
                </button>
                {showReplyInput && (
                    <div>
                        <input
                            type="text"
                            placeholder="Write a Quack Back!"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleReply();
                                }
                            }}
                        />
                        <button className="replyBttn" onClick={handleReply}>
                            Submit
                        </button>
                    </div>
                )}
                {message.replies && message.replies.length > 0 && (
                    <MessageList messages={message.replies} addReply={addReply} level={level + 1} />
                )}
            </div>
        );
    }
}

export default ChannelPage;