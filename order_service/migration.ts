import { Pool } from 'pg';
import { DB_URL } from './src/config';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres/driver';

async function runMigration() {
    try {
        console.log("migration start...");
        const pool = new Pool({ connectionString: DB_URL });
        const db = drizzle(pool);
        await migrate(db, { migrationsFolder: "./src/db/migrations" });
        console.log("migration was successful!");
        pool.end();
    } catch (error) {
        console.log("migration error: ", error);
    }
}

runMigration();