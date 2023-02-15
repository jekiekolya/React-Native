const posts = [
  {
    id: "1",
    title: "Post 1",
    imageUrl:
      "https://img.itinari.com/countries/ua-ukraine.jpg?ch=DPR&dpr=2.625&w=1600&s=76b48d9430a1bdc555274df0fa944579",
    countComments: 3,
    countLikes: 153,
    location: "Ukraine",
    comments: [
      {
        id: "1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 08:40",
        owner: false,
      },
      {
        id: "2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        authorName: "Author 2",
        authorAvatar:
          "https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg",
        createdAt: "09 червня, 2020 | 09:14",
        owner: true,
      },
      {
        id: "3",
        comment: "Thank you! That was very helpful!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 09:20",
        owner: false,
      },
    ],
  },
  {
    id: "2",
    title: "Post 2",
    imageUrl:
      "https://img.freepik.com/free-photo/wide-angle-shot-of-a-single-tree-growing-under-a-clouded-sky-during-a-sunset-surrounded-by-grass_181624-22807.jpg",
    countComments: 3,
    countLikes: 153,
    location: "Rivne",
    comments: [
      {
        id: "1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 08:40",
        owner: false,
      },
      {
        id: "2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        authorName: "Author 2",
        authorAvatar:
          "https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg",
        createdAt: "09 червня, 2020 | 09:14",
        owner: true,
      },
      {
        id: "3",
        comment: "Thank you! That was very helpful!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 09:20",
        owner: false,
      },
    ],
  },
  {
    id: "3",
    title: "Post 3",
    imageUrl:
      "https://www.eea.europa.eu/themes/biodiversity/state-of-nature-in-the-eu/state-of-nature-2020-subtopic/image_print",
    countComments: 1,
    countLikes: 153,
    location: "Lutsk",
    comments: [
      {
        id: "1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 08:40",
        owner: false,
      },
    ],
  },
  {
    id: "4",
    title: "Post 4",
    imageUrl: "https://www.bsr.org/images/heroes/bsr-focus-nature-hero.jpg",
    countComments: 4,
    countLikes: 153,
    location: "Simoniv",
    comments: [
      {
        id: "1",
        comment:
          "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 08:40",
        owner: false,
      },
      {
        id: "2",
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        authorName: "Author 2",
        authorAvatar:
          "https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg",
        createdAt: "09 червня, 2020 | 09:14",
        owner: true,
      },
      {
        id: "3",
        comment: "Thank you! That was very helpful!",
        authorName: "Author 1",
        authorAvatar:
          "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
        createdAt: "09 червня, 2020 | 09:20",
        owner: false,
      },
      {
        id: "4",
        comment: "Jekie Koly your wonderful!",
        authorName: "Author 3",
        authorAvatar:
          "https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg",
        createdAt: "09 червня, 2020 | 10:00",
        owner: false,
      },
    ],
  },
];

export default posts;
