import { db } from './index';
import { sql } from 'drizzle-orm';

async function migrate() {
  try {
    console.log('Creating guestbook_entries table if it doesn\'t exist...');
    
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS guestbook_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();