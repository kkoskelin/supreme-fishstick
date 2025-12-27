import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Reverse mapping: Team name -> Team code
const TEAM_NAME_TO_CODE: Record<string, string> = {
  'Baraboo': 'B',
  'Cross Plains': 'C',
  'Spring Green': 'G',
  'Mt. Horeb': 'H',
  'Sauk Prairie': 'K',
  'Mazomanie': 'M',
  'Sun Prairie': 'P',
  'Wis. Dells': 'W',
};

// Helper to convert team name to code (case-insensitive)
function getTeamCode(teamName: string): string | null {
  // Try exact match first
  if (TEAM_NAME_TO_CODE[teamName]) {
    return TEAM_NAME_TO_CODE[teamName];
  }

  // Try case-insensitive match
  const lowerTeamName = teamName.toLowerCase();
  for (const [name, code] of Object.entries(TEAM_NAME_TO_CODE)) {
    if (name.toLowerCase() === lowerTeamName) {
      return code;
    }
  }

  // Check if it's already a code (single letter)
  if (teamName.length === 1 && /[A-Z]/i.test(teamName)) {
    return teamName.toUpperCase();
  }

  return null;
}

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
      // Convert team name to team code before querying
      const teamCode = getTeamCode(team as string);
      if (teamCode) {
        query = query.eq('team', teamCode);
      } else {
        // If team name doesn't match, return empty results
        return res.status(200).json({
          success: true,
          count: 0,
          records: [],
          warning: `Unknown team: ${team}`
        });
      }
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
