'use client'

import { DarkModeToggle } from './DarkModeToggle'

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📖</span>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Guestbook
          </h1>
        </div>
        
        <DarkModeToggle />
      </div>
    </header>
  )
}