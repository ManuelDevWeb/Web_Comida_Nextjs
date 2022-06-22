// Importando datos
import {categorias} from './data/categorias';
import { productos } from './data/productos';
// Client para realizar operaciones con la DB
import {PrismaClient} from '@prisma/client';


const prisma=new PrismaClient();

const main = async ()=>{
    try {
        // Crear multiples elementos en el modelo Categoria de la DB
        await prisma.categoria.createMany({
            data: categorias
        })
        // Crear multiples elementos en el modelo Producto de la DB
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error);
    }
}

main();