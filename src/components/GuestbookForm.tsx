'use client'

import { useState, useTransition } from 'react'
import { addGuestbookEntry } from '@/lib/actions'

export function GuestbookForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !message.trim()) {
      alert('Please fill in both fields')
      return
    }

    startTransition(async () => {
      try {
        await addGuestbookEntry({ name: name.trim(), message: message.trim() })
        setName('')
        setMessage('')
      } catch (error) {
        alert('Failed to add entry. Please try again.')
        console.error('Error adding entry:', error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Enter your name"
          maxLength={50}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isPending}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Share your thoughts..."
          maxLength={500}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {message.length}/500 characters
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isPending || !name.trim() || !message.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Adding...' : 'Sign Guestbook'}
      </button>
    </form>
  )
}