import { Character } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

type Data = {
  message: string | any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body as Character
  if (req.method === 'POST') {
    try {
      await prisma.character.create({
        data,
      })
      res.status(200).json({ message: 'Note created' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  }
}
