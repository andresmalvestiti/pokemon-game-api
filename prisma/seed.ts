import { Element, PrismaClient } from '@prisma/client';
import data from './data.json';

const prisma = new PrismaClient();

async function main() {
  const eneryTypes = data.pokemonEnergyTypes as Record<string, string>;
  const promises = Object.entries(eneryTypes).map(
    async ([key, value]) =>
      await prisma.element.upsert({
        where: { id: Number(key) },
        update: {},
        create: {
          name: value,
        },
      }),
  );
  const createdEneryTypes = (await Promise.all(promises)) as Element[];
  const result = await prisma.card.createMany({ data: data.cards });
  console.log(
    'Created energies: ',
    createdEneryTypes.map(({ name }) => name),
  );
  console.log('Created cards: ', result.count);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
