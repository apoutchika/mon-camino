import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'stats.db');
const db = new Database(dbPath);

// Créer les tables si elles n'existent pas
db.exec(`
  CREATE TABLE IF NOT EXISTS downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    format TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_hash TEXT NOT NULL,
    user_agent TEXT
  );

  CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_id INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_hash TEXT NOT NULL,
    UNIQUE(day_id, ip_hash)
  );

  CREATE INDEX IF NOT EXISTS idx_downloads_ip_format ON downloads(ip_hash, format);
  CREATE INDEX IF NOT EXISTS idx_likes_day ON likes(day_id);
`);

// Anonymiser l'IP avec un hash
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT || 'default-salt').digest('hex');
}

export function incrementDownload(format: 'epub' | 'pdf', ip: string, userAgent?: string): boolean {
  const ipHash = hashIP(ip);
  
  // Vérifier si cette IP a déjà téléchargé ce format
  const existing = db.prepare(
    'SELECT id FROM downloads WHERE ip_hash = ? AND format = ?'
  ).get(ipHash, format);

  if (existing) {
    return false; // Déjà téléchargé
  }

  const stmt = db.prepare('INSERT INTO downloads (format, ip_hash, user_agent) VALUES (?, ?, ?)');
  stmt.run(format, ipHash, userAgent || null);
  return true;
}

export function getDownloadStats() {
  // Total = somme des téléchargements par format (pas les IPs uniques)
  const total = db.prepare('SELECT COUNT(*) as count FROM downloads').get() as { count: number };
  const byFormat = db.prepare(`
    SELECT format, COUNT(DISTINCT ip_hash) as count 
    FROM downloads 
    GROUP BY format
  `).all() as { format: string; count: number }[];

  return {
    total: total.count,
    epub: byFormat.find(f => f.format === 'epub')?.count || 0,
    pdf: byFormat.find(f => f.format === 'pdf')?.count || 0,
  };
}

export function toggleLike(dayId: number, ip: string): { liked: boolean; count: number } {
  const ipHash = hashIP(ip);

  // Vérifier si déjà liké
  const existing = db.prepare(
    'SELECT id FROM likes WHERE day_id = ? AND ip_hash = ?'
  ).get(dayId, ipHash);

  if (existing) {
    // Retirer le like
    db.prepare('DELETE FROM likes WHERE day_id = ? AND ip_hash = ?').run(dayId, ipHash);
  } else {
    // Ajouter le like
    db.prepare('INSERT INTO likes (day_id, ip_hash) VALUES (?, ?)').run(dayId, ipHash);
  }

  // Retourner le nouveau statut
  const count = db.prepare('SELECT COUNT(*) as count FROM likes WHERE day_id = ?').get(dayId) as { count: number };
  const liked = !existing;

  return { liked, count: count.count };
}

export function getLikesForDay(dayId: number, ip?: string) {
  const count = db.prepare('SELECT COUNT(*) as count FROM likes WHERE day_id = ?').get(dayId) as { count: number };
  
  let liked = false;
  if (ip) {
    const ipHash = hashIP(ip);
    const existing = db.prepare('SELECT id FROM likes WHERE day_id = ? AND ip_hash = ?').get(dayId, ipHash);
    liked = !!existing;
  }

  return { count: count.count, liked };
}

export default db;
