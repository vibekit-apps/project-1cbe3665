import { GuestbookForm } from '@/components/GuestbookForm'
import { GuestbookEntries } from '@/components/GuestbookEntries'
import { getGuestbookEntries } from '@/lib/actions'

export default async function Home() {
  const entries = await getGuestbookEntries()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📖 Guestbook
          </h1>
          <p className="text-xl text-gray-600">
            Leave your mark and share your thoughts with the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Recent Messages
            </h2>
            <GuestbookEntries initialEntries={entries} />
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Sign the Guestbook
              </h2>
              <GuestbookForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}