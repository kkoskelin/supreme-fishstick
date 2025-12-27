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
    // Fetch all unique names with pagination
    let allNames: Set<string> = new Set();
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data: pageData, error: pageError } = await supabase
        .from('swim_records')
        .select('display_name')
        .range(page * pageSize, (page + 1) * pageSize - 1)
        .order('display_name');

      if (pageError) throw pageError;

      if (pageData && pageData.length > 0) {
        pageData.forEach(r => allNames.add(r.display_name));
        page++;
        hasMore = pageData.length === pageSize;
      } else {
        hasMore = false;
      }
    }

    const uniqueNames = Array.from(allNames).sort();
    res.status(200).json({
      success: true,
      count: uniqueNames.length,
      names: uniqueNames
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
