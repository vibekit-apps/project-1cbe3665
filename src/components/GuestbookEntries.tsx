'use client'

import { useEffect, useState } from 'react'
import type { GuestbookEntry } from '../../db/schema'
import { getGuestbookEntries } from '@/lib/actions'

interface GuestbookEntriesProps {
  initialEntries: GuestbookEntry[]
}

export function GuestbookEntries({ initialEntries }: GuestbookEntriesProps) {
  const [entries, setEntries] = useState(initialEntries)

  useEffect(() => {
    const refreshEntries = async () => {
      try {
        const newEntries = await getGuestbookEntries()
        setEntries(newEntries)
      } catch (error) {
        console.error('Failed to refresh entries:', error)
      }
    }

    const interval = setInterval(refreshEntries, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">✨</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No messages yet!
        </h3>
        <p className="text-gray-500">
          Be the first to sign our guestbook and share your thoughts.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-gray-900">
              {entry.name}
            </h3>
            <time className="text-sm text-gray-500">
              {new Date(entry.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </time>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {entry.message}
          </p>
        </div>
      ))}
    </div>
  )
}