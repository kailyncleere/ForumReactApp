import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'


function Home() {
    const [input, setInput] = useState('')
    const [channelNames, setChannelNames] = useState([])
    const [nextId, setNextId] = useState(1)
    const navigate = useNavigate()

    const addChannel = () => {
        if (input.trim() === '') {
            alert('Please enter a channel name')
            return
        }
        const newChannel = {
            id: nextId,
            name: input
        };
        setChannelNames([...channelNames, newChannel])
        setInput('')
        setNextId(nextId + 1)
        console.log(input, 'added to channels assigned id: ' + nextId)
    }
    const handleChannelClick = (id => {
        navigate(`/channel/${id}`) 
    })


    return (
        <div className='homeBackground'>
            <h1>Nurture Nature Community Forum</h1>
            <br />
            <div className='homeForm'>
                <input 
                    className='homeInput' 
                    type='text'
                    placeholder='Unleash your thoughts!' 
                    required
                    value={input} 
                    onChange={event => setInput(event.target.value)}
                />
                <button 
                    className='channelBttn' 
                    onClick={addChannel}>pawnder this
                </button>
            <hr />
                <div className='channelList'>
                {channelNames.map(channel => (
                    <h5 
                        key={channel.id}
                        className= 'channelLink'
                        onClick={() => handleChannelClick(channel.id)}
                    >
                        {channel.name}
                    </h5>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Home
