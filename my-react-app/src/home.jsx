import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
    const [input, setInput] = useState('');
    const [channelNames, setChannelNames] = useState([]);
    const [nextId, setNextId] = useState(1);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const storedChannels = JSON.parse(localStorage.getItem('channels'));
        if (storedChannels && Array.isArray(storedChannels)) {
            console.log('Loaded channels from localStorage:', storedChannels);
            setChannelNames(storedChannels);

            const maxId = storedChannels.reduce((max, channel) => Math.max(max, channel.id), 0);
            setNextId(maxId + 1);
        } else {
            console.log('No valid channels found in localStorage.');
        }
    }, []);

    useEffect(() => {
        if (channelNames.length > 0) {
            console.log('Saving channels to localStorage:', channelNames);
            localStorage.setItem('channels', JSON.stringify(channelNames));
        }
    }, [channelNames]);


    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const addChannel = () => {
        if (input.trim() === '') {
            alert('Please enter a channel name');
            return;
        }
        const newChannel = {
            id: nextId,
            name: input,
        };
        setChannelNames([...channelNames, newChannel]);
        setInput('');
        setNextId(nextId + 1);
        console.log(input, 'added to channels assigned id: ' + nextId);
    };

    const handleChannelClick = (id) => {
        const channel = channelNames.find((channel) => channel.id === id);
        navigate(`/channel/${id}`, { state: { channelName: channel.name } });
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="homeBackground">
            <button className="logoutButton" onClick={handleLogout}>
                Logout
            </button>
            <h1>Nurture Nature Community Forum</h1>
            <br />
            <div className="homeForm">
                <input
                    ref={inputRef}
                    className="homeInput"
                    type="text"
                    placeholder="Unleash your thoughts!"
                    required
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addChannel();
                        }
                    }}
                />
                <button className="channelBttn" onClick={addChannel}>
                    pawnder this
                </button>
                <hr />
                <div className="channelList">
                    {channelNames.map((channel) => (
                        <h5
                            key={channel.id}
                            className="channelLink"
                            onClick={() => handleChannelClick(channel.id)}
                        >
                            {channel.name}
                        </h5>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
