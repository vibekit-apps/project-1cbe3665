import { GuestbookForm } from '@/components/GuestbookForm'
import { GuestbookEntries } from '@/components/GuestbookEntries'
import { Header } from '@/components/Header'
import { getGuestbookEntries } from '@/lib/actions'

export default async function Home() {
  const entries = await getGuestbookEntries()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📖 Guestbook
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leave your mark and share your thoughts with the world
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Recent Messages
              </h2>
              <GuestbookEntries initialEntries={entries} />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Sign the Guestbook
                </h2>
                <GuestbookForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}