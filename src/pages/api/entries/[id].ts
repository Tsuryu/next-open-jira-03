import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { db } from '@/database';
import { Entry } from '@/models';
import { Data } from '.';

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  const { description, status } = req.body;

  try {
    await db.connect();
    const entry = await Entry.findById(id);
    if (!entry) {
      await db.disconnect();
      res.status(404).json({ message: 'Not found' });
      return;
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description: description ?? entry.description,
        status: status ?? entry.status
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    res.status(201).json({ entry: updatedEntry! });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'Failed to create new entry' });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entry = await Entry.findById(id);
    if (!entry) {
      await db.disconnect();
      res.status(404).json({ message: 'Not found' });
      return;
    }

    await db.disconnect();
    res.status(200).json({ entry });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'Failed to get entry' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entry = await Entry.findByIdAndDelete(id);

    if (!entry) {
      await db.disconnect();
      res.status(404).json({ message: 'Not found' });
      return;
    }

    await db.disconnect();
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'Failed to get entry' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid id: ${id}` });
  }

  switch (req.method) {
    case 'PUT':
      return putEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(501).json({ message: 'Not implemented yet' });
  }
}
