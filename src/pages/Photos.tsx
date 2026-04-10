import { motion } from 'motion/react';

export default function Photos() {
  const photos = [
    { id: 1, url: 'https://picsum.photos/seed/nature1/800/600', caption: 'Hiking in Yosemite' },
    { id: 2, url: 'https://picsum.photos/seed/city1/800/600', caption: 'San Francisco Sunset' },
    { id: 3, url: 'https://picsum.photos/seed/tech1/800/600', caption: 'My Workspace' },
    { id: 4, url: 'https://picsum.photos/seed/food1/800/600', caption: 'Best Ramen in Town' },
    { id: 5, url: 'https://picsum.photos/seed/travel1/800/600', caption: 'Tokyo Nights' },
    { id: 6, url: 'https://picsum.photos/seed/art1/800/600', caption: 'Museum Visit' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Photography</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.02 }}
            className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
