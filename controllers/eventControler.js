import { pool } from '../db/db.js';



export async function createEvent(req, res) {
    const body = req.body;
    const title = body.title;
    const date_time = body.date_time;
    const location = body.location;
    const capacity = body.capacity;

    if (capacity <= 0 || capacity > 1000) {
        res.status(400).json({ message: 'Capacity invalid' });
        return;
    }

    const result = await pool.query(
        'INSERT INTO events (title, date_time, location, capacity) VALUES ($1, $2, $3, $4) RETURNING id',[title, date_time, location, capacity]
    );

    res.status(201).json({ eventId: result.rows[0].id });
}




export async function singleEvent(req, res) {
    const id = req.params.id;

    const eventData = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

    if (eventData.rowCount === 0) {
        res.status(404).json({ message: 'Event not found' });
        return;
    }

    const users = await pool.query('SELECT user_id FROM registrations WHERE event_id = $1', [id]);

    res.json({
        event: eventData.rows[0],
        registered_users: users.rows.map(function (u) { return u.user_id; })
    });
}




export async function register(req, res) {
    const id = req.params.id;
    const user_id = req.body.user_id;

    const check = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (check.rowCount === 0) {
        res.status(404).json({ message: 'Event missing' });
        return;
    }

    const event = check.rows[0];
    const now = new Date();
    const eventDate = new Date(event.date_time);
    if (eventDate < now) {
        res.status(400).json({ message: 'You are too late' });
        return;
    }

    const reg = await pool.query('SELECT COUNT(*) FROM registrations WHERE event_id = $1', [id]);
    if (parseInt(reg.rows[0].count) >= event.capacity) {
        res.status(400).json({ message: 'Full' });
        return;
    }

    const dupe = await pool.query('SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2', [user_id, id]);
    if (dupe.rowCount > 0) {
        res.status(400).json({ message: 'you are already in' });
        return;
    }

    await pool.query('INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)', [user_id, id]);
    res.status(201).json({ message: 'Done' });
}




export async function cancelRegistration(req, res) {
    const id = req.params.id;
    const user_id = req.body.user_id;

    const gone = await pool.query('DELETE FROM registrations WHERE user_id = $1 AND event_id = $2 RETURNING *', [user_id, id]);

    if (gone.rowCount === 0) {
        res.status(400).json({ message: 'Not found' });
        return;
    }

    res.json({ message: 'Cancelled' });
}




export async function listUpcomingEvents(req, res) {
    const q = await pool.query('SELECT * FROM events WHERE date_time > NOW() ORDER BY date_time ASC, location ASC');
    res.json(q.rows);
}




export async function eventStats(req, res) {
    const id = req.params.id;

    const c = await pool.query('SELECT capacity FROM events WHERE id = $1', [id]);
    const r = await pool.query('SELECT COUNT(*) FROM registrations WHERE event_id = $1', [id]);

    const total = parseInt(r.rows[0].count);
    const cap = c.rows[0].capacity;

    res.json({
        total: total,
        remaining: cap - total,
        used: ((total / cap) * 100).toFixed(0) + '%'
    });
}
