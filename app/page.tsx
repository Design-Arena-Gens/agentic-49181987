'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your personal assistant. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsLoading(false)
    }, 1000)
  }

  const generateResponse = (message: string): string => {
    const lower = message.toLowerCase()

    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hello! It\'s great to hear from you. What would you like to know or do today?'
    }

    if (lower.includes('time')) {
      const time = new Date().toLocaleTimeString()
      return `The current time is ${time}.`
    }

    if (lower.includes('date')) {
      const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return `Today is ${date}.`
    }

    if (lower.includes('weather')) {
      return 'I don\'t have access to real-time weather data, but I recommend checking your local weather service for accurate information.'
    }

    if (lower.includes('help')) {
      return 'I can help you with various tasks:\n• Answer general questions\n• Provide the current time and date\n• Have a friendly conversation\n• Assist with information and guidance\n\nJust ask me anything!'
    }

    if (lower.includes('thank')) {
      return 'You\'re welcome! I\'m always here to help if you need anything else.'
    }

    if (lower.includes('joke')) {
      const jokes = [
        'Why did the scarecrow win an award? He was outstanding in his field!',
        'What do you call a bear with no teeth? A gummy bear!',
        'Why don\'t scientists trust atoms? Because they make up everything!',
        'What do you call a fake noodle? An impasta!',
      ]
      return jokes[Math.floor(Math.random() * jokes.length)]
    }

    if (lower.includes('how are you')) {
      return 'I\'m doing great, thank you for asking! I\'m here and ready to assist you with whatever you need.'
    }

    return 'That\'s an interesting question! I\'m here to help you with various tasks and answer your questions. Could you provide more details or ask me something specific?'
  }

  return (
    <div className="container">
      <header className="header">
        <h1>My Assistant</h1>
        <p>Your intelligent personal helper, always ready to assist</p>
      </header>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="icon">💬</div>
          <h3>Conversational</h3>
          <p>Chat naturally with your assistant using everyday language</p>
        </div>
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Fast Responses</h3>
          <p>Get quick answers to your questions and requests</p>
        </div>
        <div className="feature-card">
          <div className="icon">🎯</div>
          <h3>Always Available</h3>
          <p>Your assistant is ready to help whenever you need it</p>
        </div>
      </div>
    </div>
  )
}
