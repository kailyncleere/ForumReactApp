import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './channelPage.css';
import { useState, useEffect, useRef } from 'react';

function ChannelPage({ id, channelName }) {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const postInputRef = useRef(null);

    const storageKey = `messages_channel_${id}`;

    useEffect(() => {
        postInputRef.current?.focus();
    }, []);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem(storageKey));
        console.log('Loaded messages from localStorage:', storedMessages);
        if (storedMessages && Array.isArray(storedMessages)) {
            setMessages(storedMessages);
        } else {
            console.log('No valid messages found in localStorage.');
            setMessages([]);
        }
    }, [id]);

    useEffect(() => {
        if (messages.length > 0) {
            console.log('Saving messages to localStorage:', messages);
            localStorage.setItem(storageKey, JSON.stringify(messages));
        }
    }, [messages, storageKey]);

    const addMessage = () => {
        if (input.trim() === '') return;
        const username = localStorage.getItem('username');
        const newMessage = {
            id: Date.now(),
            text: input,
            author: username || 'Anonymous',
            replies: [],
        };
        setMessages([...messages, newMessage]);
        setInput('');
        console.log(input, 'added to channel #' + id);
    };

    const addReply = (parentId, replyText) => {
        const username = localStorage.getItem('username');
        const addNestedReply = (messages) =>
            messages.map((message) => {
                if (message.id === parentId) {
                    return {
                        ...message,
                        replies: [
                            ...message.replies,
                            {
                                id: Date.now(),
                                text: replyText,
                                author: username || 'Anonymous',
                                replies: [],
                            },
                        ],
                    };
                } else {
                    return {
                        ...message,
                        replies: addNestedReply(message.replies),
                    };
                }
            });

        const updatedMessages = addNestedReply(messages);
        setMessages(updatedMessages);
    };

    return (
        <div className="channelBackground">
            <h2>{channelName || `Channel #${id}`}</h2>
            <div className="channelForm">
                <input
                    ref={postInputRef}
                    type="text"
                    placeholder="Meow it over"
                    required
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addMessage();
                        }
                    }}
                />
                <button className="channelBttn" onClick={addMessage}>
                    post
                </button>
            </div>
            {messages.length === 0 ? (
                <p>Chime in fur real!</p>
            ) : (
                <div>
                    <MessageList messages={messages} addReply={addReply} />
                </div>
            )}
        </div>
    );

    function MessageList({ messages, addReply, level = 0 }) {
        return (
            <div className="messageList">
                {messages.map((message) => (
                    <MessageItem
                        key={message.id}
                        message={message}
                        addReply={addReply}
                        level={level}
                    />
                ))}
            </div>
        );
    }

    function MessageItem({ message, addReply, level }) {
        const [showReplyBox, setShowReplyBox] = useState(false);
        const [replyInput, setReplyInput] = useState('');
        const replyInputRef = useRef(null);

        const handleReply = () => {
            if (replyInput.trim() !== '') {
                addReply(message.id, replyInput);
                setReplyInput('');
                setShowReplyBox(false);
            }
        };

        const handleReplyButtonClick = () => {
            setShowReplyBox(!showReplyBox);
            if (!showReplyBox) {
                setTimeout(() => replyInputRef.current?.focus(), 0);
            }
        };

        return (
            <div
                className={`messageItem ${level % 2 === 0 ? 'level-even' : 'level-odd'}`}
                style={{ '--level': level }}
            >
                <div>
                    <strong>{message.author || 'Anonymous'}:</strong> {message.text}
                </div>
                <button onClick={handleReplyButtonClick}>
                    {showReplyBox ? 'cancel' : 'reply'}
                </button>

                {showReplyBox && (
                    <div>
                        <input
                            ref={replyInputRef}
                            type="text"
                            placeholder="reply"
                            value={replyInput}
                            onChange={(event) => setReplyInput(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleReply();
                                }
                            }}
                        />
                        <button onClick={handleReply}>post</button>
                    </div>
                )}

                {message.replies.length > 0 && (
                    <MessageList
                        messages={message.replies}
                        addReply={addReply}
                        level={level + 1}
                    />
                )}
            </div>
        );
    }
}

export default ChannelPage;