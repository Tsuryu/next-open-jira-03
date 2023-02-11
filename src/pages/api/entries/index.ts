import type { NextApiRequest, NextApiResponse } from 'next';

import { Entry, IEntry } from '@/models';
import { db } from '@/database';

export type Data =
  | {
      message: string;
    }
  | {
      entries: IEntry[];
    }
  | {
      entry: IEntry;
    };

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnect();

  res.status(200).json({ entries });
};

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;

  const newEntry = new Entry({
    description
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    res.status(201).json({ entry: newEntry });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'Failed to create new entry' });
  }
};

// eslint-disable-next-line consistent-return
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntries(req, res);
    case 'PUT':
      return postEntries(req, res);
    default:
      return res.status(501).json({ message: 'Not implemented yet' });
  }
}
