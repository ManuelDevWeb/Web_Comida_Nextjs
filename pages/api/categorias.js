// localhost:3000/api/categorias

// PrismaClient Para interactuar con la DB
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Obtener todas las categorias de la DB
  const categorias = await prisma.categoria.findMany();

  res.status(200).json(categorias);
}
