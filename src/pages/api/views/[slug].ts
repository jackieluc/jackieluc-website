import { NextApiRequest, NextApiResponse } from 'next';
import SupabaseAdmin from '@/clients/supabase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(400).json({
      message: 'Unsupported Request',
    });
  }

  if (req.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    if (process.env.NODE_ENV === 'production') {
      await SupabaseAdmin.rpc('increment_page_view', { page_slug: req.query.slug });
    }
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('pages').select('view_count').filter('slug', 'eq', req.query.slug);

    if (data) {
      return res.status(200).json({
        views: data[0]?.view_count || 0,
      });
    }
  }
}
