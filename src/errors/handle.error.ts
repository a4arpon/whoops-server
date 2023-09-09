import { Response } from 'express';

export const handleErrors = async (error: unknown, res: Response) => {
  try {
    await Promise.reject(error);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ msg: err.message });
    else res.status(400).json({ msg: 'An error occurred.' });
  }
};
