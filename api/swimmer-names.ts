import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
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
    // Use raw SQL to get distinct swimmer names efficiently
    const { data, error } = await supabase
      .rpc('get_unique_swimmer_names')
      .limit(10000); // Set high limit to get all unique names

    // Fallback to JavaScript deduplication if RPC function doesn't exist
    if (error && error.message?.includes('function') && error.message?.includes('does not exist')) {
      // Fetch all records with pagination to get all unique names
      let allNames: string[] = [];
      let page = 0;
      const pageSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data: pageData, error: pageError } = await supabase
          .from('swim_records')
          .select('display_name')
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (pageError) throw pageError;

        if (pageData && pageData.length > 0) {
          allNames.push(...pageData.map(r => r.display_name));
          page++;
          hasMore = pageData.length === pageSize;
        } else {
          hasMore = false;
        }
      }

      const uniqueNames = Array.from(new Set(allNames)).sort();
      return res.status(200).json({
        success: true,
        count: uniqueNames.length,
        names: uniqueNames
      });
    }

    if (error) throw error;

    // Handle different return formats from RPC function
    // SETOF TEXT returns plain strings, TABLE returns objects with display_name
    let names: string[] = [];
    if (data && data.length > 0) {
      if (typeof data[0] === 'string') {
        // Plain strings from SETOF TEXT
        names = data as string[];
      } else if (typeof data[0] === 'object' && data[0] !== null) {
        // Objects from TABLE - extract display_name or get_unique_swimmer_names property
        names = data.map((row: any) =>
          row.display_name || row.get_unique_swimmer_names || String(row)
        );
      }
    }

    res.status(200).json({
      success: true,
      count: names.length,
      names: names
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
