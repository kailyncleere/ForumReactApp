import { useParams } from 'react-router-dom'
import './channelPage.css'
import { useState, useEffect } from 'react'

function ChannelPage() {
    const { id } = useParams()
    const [messages, setMessages] = useState([])
    const [input,setInput] = useState('')

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Channel #{id}</h2>
            <p>Welcome to the discussion board!</p>
            {/* You can expand this with post features later */}
        </div>
    )
}

export default ChannelPage