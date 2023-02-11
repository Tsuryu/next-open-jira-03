interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'pending Esse irure minim quis reprehenderit magna ut.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'progress Officia proident reprehenderit cillum quis ut ut cupidatat cillum pariatur mollit aliqua.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description:
        'finished Pariatur reprehenderit consequat adipisicing eu adipisicing consectetur voluptate magna cupidatat.',
      status: 'finished',
      createdAt: Date.now() - 10000000
    }
  ]
};
