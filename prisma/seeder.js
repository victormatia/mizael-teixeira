const { PrismaClient, Decimal } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Dados dos gêneros e suas músicas
  const genresData = [
    {
      name: 'Sertanejo',
      songs: [
        { name: 'Relação Errada', author: 'Gusttavo Lima (feat. Bruno & Marrone)' },
        { name: 'Dois Tristes', author: 'Simone Mendes' },
        { name: 'Bem Mais Que Eu', author: 'Diego & Victor Hugo' },
        { name: 'Daqui Pra Sempre', author: 'Manu Bahtidão (feat. Simone Mendes)' },
        { name: 'Escrito Nas Estrelas', author: 'Lauana Prado' },
        { name: 'Haverá Sinais', author: 'Jorge & Mateus (feat. Lauana Prado)' },
        { name: 'Vazou Na Braquiara', author: 'Hugo & Guilherme' },
        { name: 'Aproveita', author: 'Clayton & Romário' },
        { name: 'Chave', author: 'Thiago & Samuel (feat. Gustavo Mioto and Os Parazin)' },
        { name: 'Deja Vu', author: 'Luan Santana (feat. Ana Castela)' },
      ],
    },
    {
      name: 'Gospel',
      songs: [
        { name: 'Raridade', author: 'Anderson Freire' },
        { name: 'Acalma meu coração', author: 'Anderson Freire' },
        { name: 'Cuido dos detalhes', author: 'André & Felipe (feat. Isadora Pompeo)' },
        { name: 'Estamos de pé', author: 'Marcus Salles' },
        { name: 'Grandes coisas', author: 'Fernandinho' },
        { name: 'Pode morar aqui', author: 'Theo Rubia' },
        { name: 'Lindo momento', author: 'DJ PV (feat. Julliany Souza)' },
        { name: 'Meu universo', author: 'PG' },
        { name: 'Hino da Vitória', author: 'Cassiane' },
        { name: 'Casa do Pai', author: 'Aline Barros' },
      ],
    },
    {
      name: 'MPB',
      songs: [
        { name: 'Água-viva', author: 'ANAVITÓRIA' },
        { name: 'Mais Bonito Não Há', author: 'Milton Nascimento & Tiago Iorc' },
        { name: 'Ainda Bem', author: 'Marisa Monte' },
        { name: 'Guarde Isso', author: 'Artista Consagrado' },
        { name: 'Caminho das Águas', author: 'MPB Moderno' },
        { name: 'Coração Brasileiro', author: 'Coração Brasileiro' },
        { name: 'O Sol da Meia-Noite', author: 'Contemporâneo MPB' },
        { name: 'Amanhecer', author: 'Seu Jorge' },
        { name: 'Sorriso', author: 'Adriana Calcanhotto' },
        { name: 'Saudade', author: 'Chico Buarque' },
      ],
    },
  ];

  // Para cada gênero
  for (const genreData of genresData) {
    // Upsert do gênero
    const genreRecord = await prisma.gender.upsert({
      where: { name: genreData.name },
      update: {},
      create: { name: genreData.name },
    });

    // Para cada música do gênero
    for (const song of genreData.songs) {
      // Upsert da música (note que o campo "autor" é atualizado)
      const musicRecord = await prisma.music.upsert({
        where: { name: song.name },
        update: {},
        create: {
          name: song.name,
          autor: song.author,
          GenderToMusic: {
            create: {
              Gender: { connect: { id: genreRecord.id } },
            },
          },
        },
      });

      // Cria três versões para a música: Original, C e G
      const tones = ['Original', 'C', 'G'];
      for (const tone of tones) {
        await prisma.version.upsert({
          where: {
            // A chave composta definida no modelo Version: [musicId, tone]
            musicId_tone: { musicId: musicRecord.id, tone: tone },
          },
          update: {},
          create: {
            musicId: musicRecord.id,
            tone: tone,
            price: new Decimal(10),
            // Gera um nome de arquivo simples (pode ser ajustado conforme necessário)
            file: `${song.name.replace(/\s+/g, '_')}_${tone}.mp3`,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
