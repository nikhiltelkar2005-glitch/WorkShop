const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

async function readDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading db.json:', error);
        throw error;
    }
}

async function readDbWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return readDb();
}

async function writeDb(data) {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to db.json:', error);
        throw error;
    }
}

module.exports = {
    readDb,
    readDbWithDelay,
    writeDb
};
