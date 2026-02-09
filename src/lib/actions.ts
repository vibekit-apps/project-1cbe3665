'use server'

import { db } from '../../db'
import { guestbookEntries, type NewGuestbookEntry } from '../../db/schema'
import { desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function addGuestbookEntry(entry: Omit<NewGuestbookEntry, 'id' | 'createdAt'>) {
  try {
    await db.insert(guestbookEntries).values({
      name: entry.name,
      message: entry.message,
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to add guestbook entry:', error)
    throw new Error('Failed to add guestbook entry')
  }
}

export async function getGuestbookEntries() {
  try {
    const entries = await db
      .select()
      .from(guestbookEntries)
      .orderBy(desc(guestbookEntries.createdAt))
      .limit(50)
    
    return entries
  } catch (error) {
    console.error('Failed to fetch guestbook entries:', error)
    return []
  }
}