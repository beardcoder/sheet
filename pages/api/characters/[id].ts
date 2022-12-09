import { Character } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const characterId = req.query.id
  const data = req.body as Character
  // DELETE
  if (req.method === 'DELETE') {
    const note = await prisma.character.delete({
      where: { id: String(characterId) },
    })
    res.json(note)
  }
  // UPDATE
  else if (req.method === 'PUT') {
    const note = await prisma.character.update({
      where: { id: String(characterId) },
      data: data,
    })
    res.status(200).json({ message: 'Character updated' })
  } else {
    console.log('Note could not be modified')
    res.status(400).json({ message: 'Note could not be modified' })
  }
}
