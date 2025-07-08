import { promises as fs } from 'fs';
import path from 'path';

export async function copiarArquivos(origem, destino) {
  try {
 
    await fs.mkdir(destino, { recursive: true });

    const arquivos = await fs.readdir(origem);


    for (const arquivo of arquivos) {
      const rutaorigem = path.join(origem, arquivo);
      const rutaDestino = path.join(destino, arquivo);

      const stats = await fs.stat(rutaorigem);

      if (stats.isFile()) {
        await fs.copyFile(rutaorigem, rutaDestino);
        console.log(`Copiado: ${arquivo}`);
      }
    }

    console.log('arquivos copiados.');
  } catch (error) {
    console.error('Error copiando  arquivos:', error);
  }
}

export async function apagarArquivos(pasta) {
  try {
    const arquivos = await fs.readdir(pasta);

    for (const arquivo of arquivos) {
      const caminhoArquivo = path.join(pasta, arquivo);
      const stats = await fs.stat(caminhoArquivo);

      if (stats.isFile()) {
        await fs.unlink(caminhoArquivo);
        console.log(`Arquivo apagado: ${arquivo}`);
      }
    }

    console.log('Todos os arquivos foram apagados.');
  } catch (erro) {
    console.error('Erro ao apagar arquivos:', erro);
  }
}