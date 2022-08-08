// localhost:3000/api/ordenes

// PrismaClient Para interacturar con la DB
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Validamos que el metodo sea tipo POST
  if (req.method === "POST") {
    // Recibimos los datos por el body del frontend y la insertamos el modelo orden de la DB
    const { nombre, total, pedido, fecha } = req.body;

    const orden = await prisma.orden.create({
      // Data son los datos a insertar (Recordar que los nombres de las columnas debe coincidir con estos datos)
      data: {
        nombre,
        total,
        pedido,
        fecha,
      },
    });

    res.json(orden);
  }
}
