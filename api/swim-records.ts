import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      swimmerName,
      team,
      event,
      year,
      limit = '10000'
    } = req.query;

    let query = supabase.from('swim_records').select('*');

    // Apply filters
    if (swimmerName) {
      query = query.ilike('display_name', `%${swimmerName}%`);
    }
    if (team) {
      query = query.eq('team', team);
    }
    if (event) {
      query = query.eq('event', parseInt(event as string));
    }
    if (year) {
      query = query.gte('date', `${year}-01-01`)
                   .lte('date', `${year}-12-31`);
    }

    // Apply limit and ordering
    query = query
      .order('event', { ascending: true })
      .order('converted_time', { ascending: true })
      .limit(parseInt(limit as string));

    const { data, error } = await query;

    if (error) throw error;

    // Transform to RawSwimRecord array format
    // Format: [age, convertedTime, date, displayName, event, place, team, weekNumber]
    const records = data?.map(record => [
      record.age,
      record.converted_time,
      record.date,
      record.display_name,
      record.event,
      record.place,
      record.team,
      record.week_number
    ]) || [];

    res.status(200).json({
      success: true,
      count: records.length,
      records
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
