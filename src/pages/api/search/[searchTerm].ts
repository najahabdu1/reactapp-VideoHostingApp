import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@component/utils/client';
import { searchPostsQuery } from '@component/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const { searchTerm } = req.query;
      
      if (typeof searchTerm === 'string') {
        // searchTerm is a string
        const videosQuery = searchPostsQuery(searchTerm);
        const videos = await client.fetch(videosQuery);
        res.status(200).json(videos);
      } else if (Array.isArray(searchTerm)) {
        // searchTerm is an array of strings
        // Handle the array case if required
      } else {
        // Handle the undefined case
      }
    }
  }