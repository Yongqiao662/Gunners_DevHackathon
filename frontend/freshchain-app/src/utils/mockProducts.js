export const mockProducts = [
  {
    id: 1,
    name: 'Organic Avocados',
    origin: 'California, USA',
    freshnessScore: 92,
    status: 'In Transit',
    statusColor: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nftId: '0x1A2B3C4D',
    timeline: [
      { event: 'Harvested', location: 'Avocado Grove', timestamp: '2024-07-28T10:00:00Z', icon: 'LeafyGreen', completed: true },
      { event: 'Transported', location: 'Los Angeles', timestamp: '2024-07-28T18:00:00Z', icon: 'Truck', completed: true },
      { event: 'Quality Check', location: 'Phoenix', timestamp: '2024-07-29T08:30:00Z', icon: 'Package', completed: false },
      { event: 'Retail Ready', location: 'Store', timestamp: '2024-07-29T16:45:00Z', icon: 'Store', completed: false },
    ]
  },
  {
    id: 2,
    name: 'Fresh Salmon',
    origin: 'Norway',
    freshnessScore: 88,
    status: 'Delivered',
    statusColor: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nftId: '0x2B3C4D5E',
    timeline: [
      { event: 'Caught', location: 'Norwegian Fjords', timestamp: '2024-07-25T06:00:00Z', icon: 'LeafyGreen', completed: true },
      { event: 'Processed', location: 'Bergen Facility', timestamp: '2024-07-26T12:30:00Z', icon: 'Package', completed: true },
      { event: 'Shipped', location: 'International Waters', timestamp: '2024-07-27T18:45:00Z', icon: 'Truck', completed: true },
    ]
  },
  {
    id: 3,
    name: 'Organic Blueberries',
    origin: 'Mexico',
    freshnessScore: 76,
    status: 'Processing',
    statusColor: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1597474561103-0773c378a1fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nftId: '0x3C4D5E6F',
    timeline: [
      { event: 'Harvested', location: 'Jalisco Farm', timestamp: '2024-07-30T08:15:00Z', icon: 'LeafyGreen', completed: true },
      { event: 'Washed', location: 'Guadalajara Facility', timestamp: '2024-07-30T14:30:00Z', icon: 'Package', completed: true },
      { event: 'Quality Check', location: 'Packaging Center', timestamp: '2024-07-31T09:00:00Z', icon: 'Package', completed: false },
    ]
  },
  {
    id: 4,
    name: 'Grass-Fed Beef',
    origin: 'Argentina',
    freshnessScore: 85,
    status: 'In Storage',
    statusColor: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1690983330536-3b0089d07cf9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nftId: '0x4D5E6F7A',
    timeline: [
      { event: 'Processed', location: 'Buenos Aires', timestamp: '2024-07-20T07:00:00Z', icon: 'Package', completed: true },
      { event: 'Frozen', location: 'Storage Facility', timestamp: '2024-07-21T16:20:00Z', icon: 'Store', completed: true },
      { event: 'Shipped', location: 'International', timestamp: '2024-07-28T22:45:00Z', icon: 'Truck', completed: false },
    ]
  },
  {
    id: 5,
    name: 'Organic Almonds',
    origin: 'Spain',
    freshnessScore: 95,
    status: 'At Retailer',
    statusColor: 'bg-purple-500',
    image: 'https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nftId: '0x5E6F7A8B',
    timeline: [
      { event: 'Harvested', location: 'Andalusia', timestamp: '2024-07-10T09:30:00Z', icon: 'LeafyGreen', completed: true },
      { event: 'Roasted', location: 'Processing Plant', timestamp: '2024-07-15T14:00:00Z', icon: 'Package', completed: true },
      { event: 'Packaged', location: 'Madrid', timestamp: '2024-07-18T11:15:00Z', icon: 'Store', completed: true },
    ]
  }
];
