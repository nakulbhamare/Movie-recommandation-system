// CineMatch Initial Catalog & Fallback Data

// 100+ Curated Movies across 12 Genres with full metadata

export const GENRES = [
  {
    "genre_id": 1,
    "genre_name": "Action"
  },
  {
    "genre_id": 2,
    "genre_name": "Adventure"
  },
  {
    "genre_id": 3,
    "genre_name": "Comedy"
  },
  {
    "genre_id": 4,
    "genre_name": "Drama"
  },
  {
    "genre_id": 5,
    "genre_name": "Horror"
  },
  {
    "genre_id": 6,
    "genre_name": "Romance"
  },
  {
    "genre_id": 7,
    "genre_name": "Science Fiction"
  },
  {
    "genre_id": 8,
    "genre_name": "Thriller"
  },
  {
    "genre_id": 9,
    "genre_name": "Animation"
  },
  {
    "genre_id": 10,
    "genre_name": "Mystery"
  },
  {
    "genre_id": 11,
    "genre_name": "Crime"
  },
  {
    "genre_id": 12,
    "genre_name": "Fantasy"
  }
];

export const MOVIES = [
  {
    "movie_id": 1,
    "title": "Inception",
    "release_year": 2010,
    "director": "Christopher Nolan",
    "duration_mins": 148,
    "popularity": 98.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    "description": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious.",
    "genre_ids": [
      1,
      7,
      8
    ]
  },
  {
    "movie_id": 2,
    "title": "The Dark Knight",
    "release_year": 2008,
    "director": "Christopher Nolan",
    "duration_mins": 152,
    "popularity": 99.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    "description": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    "genre_ids": [
      1,
      11,
      4,
      8
    ]
  },
  {
    "movie_id": 3,
    "title": "Interstellar",
    "release_year": 2014,
    "director": "Christopher Nolan",
    "duration_mins": 169,
    "popularity": 97.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    "description": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    "genre_ids": [
      2,
      4,
      7
    ]
  },
  {
    "movie_id": 4,
    "title": "The Matrix",
    "release_year": 1999,
    "director": "Lana Wachowski, Lilly Wachowski",
    "duration_mins": 136,
    "popularity": 94.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7u3fhRwF69Z2b9Z5M0gK6k1zL0P.jpg",
    "description": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    "genre_ids": [
      1,
      7
    ]
  },
  {
    "movie_id": 5,
    "title": "Pulp Fiction",
    "release_year": 1994,
    "director": "Quentin Tarantino",
    "duration_mins": 154,
    "popularity": 96.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "description": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in four tales of violence and redemption.",
    "genre_ids": [
      8,
      11,
      4
    ]
  },
  {
    "movie_id": 6,
    "title": "The Shawshank Redemption",
    "release_year": 1994,
    "director": "Frank Darabont",
    "duration_mins": 142,
    "popularity": 98.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    "description": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    "genre_ids": [
      4,
      11
    ]
  },
  {
    "movie_id": 7,
    "title": "Forrest Gump",
    "release_year": 1994,
    "director": "Robert Zemeckis",
    "duration_mins": 142,
    "popularity": 95.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/arw2VCBveWOVZr6pxd9XTd1TdQa.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxShY9JH9387Np.jpg",
    "description": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    "genre_ids": [
      3,
      4,
      6
    ]
  },
  {
    "movie_id": 8,
    "title": "Fight Club",
    "release_year": 1999,
    "director": "David Fincher",
    "duration_mins": 139,
    "popularity": 94,
    "poster_url": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    "description": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town.",
    "genre_ids": [
      4,
      8
    ]
  },
  {
    "movie_id": 9,
    "title": "Spirited Away",
    "release_year": 2001,
    "director": "Hayao Miyazaki",
    "duration_mins": 125,
    "popularity": 93.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg",
    "description": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
    "genre_ids": [
      9,
      2,
      12
    ]
  },
  {
    "movie_id": 10,
    "title": "Parasite",
    "release_year": 2019,
    "director": "Bong Joon-ho",
    "duration_mins": 132,
    "popularity": 96.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/hiKmpnnNm9Ri5OPassZQ0a5WNsP.jpg",
    "description": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    "genre_ids": [
      3,
      4,
      8
    ]
  },
  {
    "movie_id": 11,
    "title": "Avengers: Endgame",
    "release_year": 2019,
    "director": "Anthony Russo, Joe Russo",
    "duration_mins": 181,
    "popularity": 97,
    "poster_url": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    "description": "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    "genre_ids": [
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 12,
    "title": "Gladiator",
    "release_year": 2000,
    "director": "Ridley Scott",
    "duration_mins": 155,
    "popularity": 93,
    "poster_url": "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/Ar7CSM1QY8a4w2hWkQ9q1n4w7d4.jpg",
    "description": "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into turmoil. Maximus Decimus Meridius, a heroic general, is betrayed and forced into slavery as a gladiator.",
    "genre_ids": [
      1,
      2,
      4
    ]
  },
  {
    "movie_id": 13,
    "title": "Whiplash",
    "release_year": 2014,
    "director": "Damien Chazelle",
    "duration_mins": 107,
    "popularity": 92.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/6bbZ6XNvyvgfITUX01a5YbgvWgm.jpg",
    "description": "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, pushing his physical and mental limits to the brink.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 14,
    "title": "Spider-Man: Into the Spider-Verse",
    "release_year": 2018,
    "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    "duration_mins": 117,
    "popularity": 95.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/uUiId6Zw32L744IZ4ca4yZ9gV8q.jpg",
    "description": "Teenager Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from parallel dimensions to stop a threat to all realities.",
    "genre_ids": [
      9,
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 15,
    "title": "Coco",
    "release_year": 2017,
    "director": "Lee Unkrich",
    "duration_mins": 105,
    "popularity": 94.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
    "description": "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    "genre_ids": [
      9,
      3,
      12
    ]
  },
  {
    "movie_id": 16,
    "title": "The Silence of the Lambs",
    "release_year": 1991,
    "director": "Jonathan Demme",
    "duration_mins": 118,
    "popularity": 93.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/mfwq2nMBzArzQ7Y9RKE8bhMuvKD.jpg",
    "description": "Clarice Starling, a top student at the FBI's training academy, is assigned to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath serving life behind bars.",
    "genre_ids": [
      11,
      4,
      8,
      10
    ]
  },
  {
    "movie_id": 17,
    "title": "Se7en",
    "release_year": 1995,
    "director": "David Fincher",
    "duration_mins": 127,
    "popularity": 94.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJsk9UO.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/533f52w57f3pW2N8U96Kqj1xZ0b.jpg",
    "description": "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the 'seven deadly sins' in an unnamed, rain-soaked city.",
    "genre_ids": [
      11,
      10,
      8
    ]
  },
  {
    "movie_id": 18,
    "title": "The Prestige",
    "release_year": 2006,
    "director": "Christopher Nolan",
    "duration_mins": 130,
    "popularity": 92.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/bdN3gXu4V6t99hFhZ7w8p0aB2k.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/tY18lF4b11fE2e6X8x3b8d4k3b8.jpg",
    "description": "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit, and jealousy with dangerous and deadly consequences.",
    "genre_ids": [
      4,
      10,
      7
    ]
  },
  {
    "movie_id": 19,
    "title": "Dune",
    "release_year": 2021,
    "director": "Denis Villeneuve",
    "duration_mins": 155,
    "popularity": 96,
    "poster_url": "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/lzWHmYzbFeDp48asuv02Q0D0d5k.jpg",
    "description": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    "genre_ids": [
      7,
      2
    ]
  },
  {
    "movie_id": 20,
    "title": "Blade Runner 2049",
    "release_year": 2017,
    "director": "Denis Villeneuve",
    "duration_mins": 164,
    "popularity": 91.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/ilRyASD777lGBW0T6hLzRmsZ6qN.jpg",
    "description": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    "genre_ids": [
      7,
      8,
      10
    ]
  },
  {
    "movie_id": 21,
    "title": "The Godfather",
    "release_year": 1972,
    "director": "Francis Ford Coppola",
    "duration_mins": 175,
    "popularity": 98.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    "description": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch Vito Corleone barely survives an attempt on his life, his youngest son steps in.",
    "genre_ids": [
      4,
      11
    ]
  },
  {
    "movie_id": 22,
    "title": "The Godfather: Part II",
    "release_year": 1974,
    "director": "Francis Ford Coppola",
    "duration_mins": 202,
    "popularity": 95,
    "poster_url": "https://image.tmdb.org/t/p/w500/hek3koDUyMrk7uOB34b8B391muK.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/poec6RqOKY9io6Rtv0knUXMEvP3.jpg",
    "description": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
    "genre_ids": [
      4,
      11
    ]
  },
  {
    "movie_id": 23,
    "title": "GoodFellas",
    "release_year": 1990,
    "director": "Martin Scorsese",
    "duration_mins": 145,
    "popularity": 93.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kcu.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCud90M.jpg",
    "description": "The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.",
    "genre_ids": [
      4,
      11
    ]
  },
  {
    "movie_id": 24,
    "title": "The Departed",
    "release_year": 2006,
    "director": "Martin Scorsese",
    "duration_mins": 151,
    "popularity": 92.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/nT97ifL23DTIRBQP3a91eHl0tS1.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/2eQz7191d87eX7W9G4HqQYjXp5Z.jpg",
    "description": "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    "genre_ids": [
      4,
      8,
      11
    ]
  },
  {
    "movie_id": 25,
    "title": "Oppenheimer",
    "release_year": 2023,
    "director": "Christopher Nolan",
    "duration_mins": 180,
    "popularity": 98.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/rM5Y7Rj1P8K0l9aP1kLp9q2N8z7.jpg",
    "description": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 26,
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "release_year": 2001,
    "director": "Peter Jackson",
    "duration_mins": 178,
    "popularity": 97.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cDK6.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vRQnzOnJeSuCeIyd1STmOS4ba0d.jpg",
    "description": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home behind to destroy it in the fires of Mount Doom.",
    "genre_ids": [
      2,
      12,
      1
    ]
  },
  {
    "movie_id": 27,
    "title": "The Lord of the Rings: The Two Towers",
    "release_year": 2002,
    "director": "Peter Jackson",
    "duration_mins": 179,
    "popularity": 96.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7tN4y58FfIwfJqWj1G5Xp4z6f1L.jpg",
    "description": "Frodo and Sam continue their journey towards Mordor to destroy the One Ring, while Aragorn, Legolas, and Gimli follow the hobbits' captors, and Merry and Pippin escape into Fangorn Forest.",
    "genre_ids": [
      2,
      12,
      1
    ]
  },
  {
    "movie_id": 28,
    "title": "The Lord of the Rings: The Return of the King",
    "release_year": 2003,
    "director": "Peter Jackson",
    "duration_mins": 201,
    "popularity": 98,
    "poster_url": "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/2u7zbn8EudG6kLlBzUYqP8f1P8F.jpg",
    "description": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces.",
    "genre_ids": [
      2,
      12,
      1
    ]
  },
  {
    "movie_id": 29,
    "title": "Star Wars: Episode V - The Empire Strikes Back",
    "release_year": 1980,
    "director": "Irvin Kershner",
    "duration_mins": 124,
    "popularity": 95.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/7BuH8itoSrLExs2YZSsM01Qk2no.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/aJCtkxLLRJJ1Lumn2qSZneAUr8U.jpg",
    "description": "The epic adventure continues as Luke Skywalker trains with Jedi Master Yoda, while his friends are pursued across the galaxy by Darth Vader.",
    "genre_ids": [
      2,
      1,
      7
    ]
  },
  {
    "movie_id": 30,
    "title": "Star Wars: Episode IV - A New Hope",
    "release_year": 1977,
    "director": "George Lucas",
    "duration_mins": 121,
    "popularity": 94.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4qCqAdHcNUm48mFiCqn3dHFFepv.jpg",
    "description": "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Luke Skywalker and Han Solo team up to rescue the princess.",
    "genre_ids": [
      2,
      1,
      7
    ]
  },
  {
    "movie_id": 31,
    "title": "The Shining",
    "release_year": 1980,
    "director": "Stanley Kubrick",
    "duration_mins": 146,
    "popularity": 93.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao8l3urDDUM4xBt.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/mmd1HnuvAzFc4inNjcnUtSD0gip.jpg",
    "description": "Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter.",
    "genre_ids": [
      5,
      8
    ]
  },
  {
    "movie_id": 32,
    "title": "Psycho",
    "release_year": 1960,
    "director": "Alfred Hitchcock",
    "duration_mins": 109,
    "popularity": 92.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/yz45KMrciuEtJuNd9BPkAQbHRFi.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/s459Oa19sS9874cM423P84cQZ4.jpg",
    "description": "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel.",
    "genre_ids": [
      5,
      8,
      10
    ]
  },
  {
    "movie_id": 33,
    "title": "Alien",
    "release_year": 1979,
    "director": "Ridley Scott",
    "duration_mins": 117,
    "popularity": 94.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/AmR3iauqRL0zbv3Ysrm8TlVFuBY.jpg",
    "description": "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a crew member is attacked by a mysterious life form, the terror begins.",
    "genre_ids": [
      5,
      7
    ]
  },
  {
    "movie_id": 34,
    "title": "Aliens",
    "release_year": 1986,
    "director": "James Cameron",
    "duration_mins": 137,
    "popularity": 93.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/r1x5JG2Kv85USuvSDLj0ioqfmKi.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/oig9XwGz2y91gZ9aF6oP41tL0qL.jpg",
    "description": "When Ellen Ripley's escape pod is found decades after her crew's fatal encounter with an alien predator, she joins a unit of colonial marines to return to LV-426.",
    "genre_ids": [
      1,
      5,
      7
    ]
  },
  {
    "movie_id": 35,
    "title": "Get Out",
    "release_year": 2017,
    "director": "Jordan Peele",
    "duration_mins": 104,
    "popularity": 92,
    "poster_url": "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vZ7EVk7FaJJY9P9y04dZ92b9qK2.jpg",
    "description": "Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but a series of disturbing discoveries lead him to a truth he never could have imagined.",
    "genre_ids": [
      5,
      8,
      10
    ]
  },
  {
    "movie_id": 36,
    "title": "Hereditary",
    "release_year": 2018,
    "director": "Ari Aster",
    "duration_mins": 127,
    "popularity": 89.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/p9fmuz2Oj3HtEJn53sE69i9Y28i.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/c4j9aJqXk6v2o2m0V87y1B7h8e9.jpg",
    "description": "When Ellen, the matriarch of the Graham family, passes away, her daughter's family begins to unravel cryptic and increasingly terrifying secrets about their ancestry.",
    "genre_ids": [
      5,
      10
    ]
  },
  {
    "movie_id": 37,
    "title": "A Quiet Place",
    "release_year": 2018,
    "director": "John Krasinski",
    "duration_mins": 90,
    "popularity": 91.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/roYyPiQDzKmIKF1Nf0I21aA5N3l.jpg",
    "description": "A family is forced to live in silence while hiding from monsters with ultra-sensitive hearing in a post-apocalyptic world.",
    "genre_ids": [
      5,
      7,
      8
    ]
  },
  {
    "movie_id": 38,
    "title": "The Thing",
    "release_year": 1982,
    "director": "John Carpenter",
    "duration_mins": 109,
    "popularity": 90.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49A9bK5Kq5b1V084P9h91B7b8.jpg",
    "description": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    "genre_ids": [
      5,
      7,
      10
    ]
  },
  {
    "movie_id": 39,
    "title": "Shutter Island",
    "release_year": 2010,
    "director": "Martin Scorsese",
    "duration_mins": 138,
    "popularity": 94.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysagvk2mM.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L0.jpg",
    "description": "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on a desolate windswept island.",
    "genre_ids": [
      4,
      8,
      10
    ]
  },
  {
    "movie_id": 40,
    "title": "Prisoners",
    "release_year": 2013,
    "director": "Denis Villeneuve",
    "duration_mins": 153,
    "popularity": 91.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/uhviEkn9t8tZ8j5qT8u2f3k0L8h.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/1P3p8798q45K9B6L6yX7w8oP81L.jpg",
    "description": "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
    "genre_ids": [
      4,
      8,
      10,
      11
    ]
  },
  {
    "movie_id": 41,
    "title": "La La Land",
    "release_year": 2016,
    "director": "Damien Chazelle",
    "duration_mins": 128,
    "popularity": 95.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkVJt0Rf0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/qJeU77V8P8gL41k5wM9p1X0Z7N4.jpg",
    "description": "Mia, an aspiring actress, and Sebastian, a dedicated jazz musician, are struggling to make ends meet in a city known for crushing hopes and breaking hearts.",
    "genre_ids": [
      3,
      4,
      6
    ]
  },
  {
    "movie_id": 42,
    "title": "Titanic",
    "release_year": 1997,
    "director": "James Cameron",
    "duration_mins": 194,
    "popularity": 97.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    "description": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later, falling in love with a free-spirited rogue artist named Jack Dawson.",
    "genre_ids": [
      4,
      6
    ]
  },
  {
    "movie_id": 43,
    "title": "Eternal Sunshine of the Spotless Mind",
    "release_year": 2004,
    "director": "Michel Gondry",
    "duration_mins": 108,
    "popularity": 93.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5q9IzL.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49P85m2QoP84cQZ49874cM423.jpg",
    "description": "Joel Barish, heartbroken that his girlfriend Clementine underwent a procedure to erase him from her memory, decides to undergo the same treatment, but discovers he still loves her.",
    "genre_ids": [
      4,
      6,
      7
    ]
  },
  {
    "movie_id": 44,
    "title": "Her",
    "release_year": 2013,
    "director": "Spike Jonze",
    "duration_mins": 126,
    "popularity": 91,
    "poster_url": "https://image.tmdb.org/t/p/w500/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/6vV8b4fQY9P9y04dZ92b9qK2vZ7.jpg",
    "description": "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    "genre_ids": [
      4,
      6,
      7
    ]
  },
  {
    "movie_id": 45,
    "title": "The Grand Budapest Hotel",
    "release_year": 2014,
    "director": "Wes Anderson",
    "duration_mins": 99,
    "popularity": 92.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWX99Xm3js5.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/qZ2b84P9h91B7b87c49A9bK5Kq5.jpg",
    "description": "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    "genre_ids": [
      3,
      4
    ]
  },
  {
    "movie_id": 46,
    "title": "Superbad",
    "release_year": 2007,
    "director": "Greg Mottola",
    "duration_mins": 113,
    "popularity": 88.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJqEB.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L1.jpg",
    "description": "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    "genre_ids": [
      3
    ]
  },
  {
    "movie_id": 47,
    "title": "The Hangover",
    "release_year": 2009,
    "director": "Todd Phillips",
    "duration_mins": 100,
    "popularity": 90.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/8Y7Xp4z6f1L7tN4y58FfIwfJqWj.jpg",
    "description": "When three groomsmen lose their best friend two days before his wedding, they must retrace their drunken steps to find him.",
    "genre_ids": [
      3
    ]
  },
  {
    "movie_id": 48,
    "title": "The Truman Show",
    "release_year": 1998,
    "director": "Peter Weir",
    "duration_mins": 103,
    "popularity": 93.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/vuza0WqY239mu4EU8T26A966Kvh.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/2u7zbn8EudG6kLlBzUYqP8f1P8G.jpg",
    "description": "An insurance salesman discovers his entire life is actually a 24/7 reality television show broadcast worldwide without his knowledge.",
    "genre_ids": [
      3,
      4,
      7
    ]
  },
  {
    "movie_id": 49,
    "title": "Knives Out",
    "release_year": 2019,
    "director": "Rian Johnson",
    "duration_mins": 130,
    "popularity": 93.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4HMUR4KvZ7r1qVp109wQp4P90aM.jpg",
    "description": "When renowned crime novelist Harlan Thrombey is found dead at his estate, inquisitive Detective Benoit Blanc is mysteriously enlisted to investigate.",
    "genre_ids": [
      3,
      10,
      11
    ]
  },
  {
    "movie_id": 50,
    "title": "12 Angry Men",
    "release_year": 1957,
    "director": "Sidney Lumet",
    "duration_mins": 96,
    "popularity": 95,
    "poster_url": "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/kGzFbGhp99zva6oZODav4cIOFsS.jpg",
    "description": "The defense and the prosecution have rested and the jury is filing into the jury room to decide if an eighteen-year-old accused of murdering his father is guilty or innocent.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 51,
    "title": "The Lion King",
    "release_year": 1994,
    "director": "Roger Allers, Rob Minkoff",
    "duration_mins": 88,
    "popularity": 96.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/wXsQvli6tWqja51Poxio5mNpneD.jpg",
    "description": "A lion prince, Simba, flees his kingdom after the murder of his father, Mufasa, only to learn the true meaning of responsibility and bravery.",
    "genre_ids": [
      9,
      2,
      4
    ]
  },
  {
    "movie_id": 52,
    "title": "WALL-E",
    "release_year": 2008,
    "director": "Andrew Stanton",
    "duration_mins": 98,
    "popularity": 94.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/fQq1FWp1rTo89rHQnlF306POpMv.jpg",
    "description": "In a distant future, a small, waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    "genre_ids": [
      9,
      7,
      2
    ]
  },
  {
    "movie_id": 53,
    "title": "Up",
    "release_year": 2009,
    "director": "Pete Docter",
    "duration_mins": 96,
    "popularity": 93.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/vpbaStTMt8qqHaEveOr2dwapRWd.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/bUcuN8x7kX9vQ1B7b87c49A9bK5.jpg",
    "description": "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with thousands of helium balloons, accidentally bringing a young boy scout along.",
    "genre_ids": [
      9,
      2,
      3
    ]
  },
  {
    "movie_id": 54,
    "title": "Princess Mononoke",
    "release_year": 1997,
    "director": "Hayao Miyazaki",
    "duration_mins": 134,
    "popularity": 92.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/jHWmOPVuvbOqJJx9Czg09GQecTX.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/yUOXm4P7w8oP81L1P3p8798q45K.jpg",
    "description": "Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must travel to the west to find a cure.",
    "genre_ids": [
      9,
      2,
      12
    ]
  },
  {
    "movie_id": 55,
    "title": "Spider-Man: Across the Spider-Verse",
    "release_year": 2023,
    "director": "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    "duration_mins": 140,
    "popularity": 97.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    "description": "After reuniting with Gwen Stacy, Brooklyn's full-time friendly neighborhood Spider-Man is catapulted across the Multiverse.",
    "genre_ids": [
      9,
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 56,
    "title": "Mad Max: Fury Road",
    "release_year": 2015,
    "director": "George Miller",
    "duration_mins": 120,
    "popularity": 94.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/nl79FQ8xWZyuL6gnvBTBzx9B9bF.jpg",
    "description": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life.",
    "genre_ids": [
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 57,
    "title": "John Wick",
    "release_year": 2014,
    "director": "Chad Stahelski",
    "duration_mins": 101,
    "popularity": 93,
    "poster_url": "https://image.tmdb.org/t/p/w500/fZPSd91TENa723asjvtNtTd23Zu.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49P85m2QoP84cQZ49874cM424.jpg",
    "description": "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him, with New York City as his bullet-riddled playground.",
    "genre_ids": [
      1,
      8,
      11
    ]
  },
  {
    "movie_id": 58,
    "title": "Top Gun: Maverick",
    "release_year": 2022,
    "director": "Joseph Kosinski",
    "duration_mins": 130,
    "popularity": 95.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    "description": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on an impossible mission.",
    "genre_ids": [
      1,
      4
    ]
  },
  {
    "movie_id": 59,
    "title": "Avatar",
    "release_year": 2009,
    "director": "James Cameron",
    "duration_mins": 162,
    "popularity": 95.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbnK0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjCmVjPnvWp9N4PzW.jpg",
    "description": "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    "genre_ids": [
      1,
      2,
      7,
      12
    ]
  },
  {
    "movie_id": 60,
    "title": "Jurassic Park",
    "release_year": 1993,
    "director": "Steven Spielberg",
    "duration_mins": 127,
    "popularity": 94.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/9i3plLl89DHMvNK450fxtSZm2HN.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/yF1EbNk8N85v9T4Yp2c3m1aB4c.jpg",
    "description": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the cloned dinosaurs to run loose.",
    "genre_ids": [
      2,
      7,
      8
    ]
  },
  {
    "movie_id": 61,
    "title": "No Country for Old Men",
    "release_year": 2007,
    "director": "Joel Coen, Ethan Coen",
    "duration_mins": 122,
    "popularity": 93.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/6d5XOczc226jECq0LIX0siK3ewn.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "description": "Llewelyn Moss stumbles upon a drug deal gone wrong and two million dollars in cash. His decision to take the money sets off a violent chain reaction of cat and mouse across Texas.",
    "genre_ids": [
      11,
      4,
      8
    ]
  },
  {
    "movie_id": 62,
    "title": "Zodiac",
    "release_year": 2007,
    "director": "David Fincher",
    "duration_mins": 157,
    "popularity": 91.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/6Sj9w0L65xVnNqD8r4f6p4b0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4qCqAdHcNUm48mFiCqn3dHFFepw.jpg",
    "description": "A cartoonist becomes obsessed with tracking down the Zodiac Killer, an unidentified murderer who terrorizes northern California with cryptic codes and letters.",
    "genre_ids": [
      11,
      4,
      10,
      8
    ]
  },
  {
    "movie_id": 63,
    "title": "Memento",
    "release_year": 2000,
    "director": "Christopher Nolan",
    "duration_mins": 113,
    "popularity": 93.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCA99x5w2Qox.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/c4j9aJqXk6v2o2m0V87y1B7h8f0.jpg",
    "description": "Leonard Shelby is searching for the man who murdered his wife. His search is hampered by an uncommon form of memory loss that prevents him from forming new memories.",
    "genre_ids": [
      10,
      8
    ]
  },
  {
    "movie_id": 64,
    "title": "Saving Private Ryan",
    "release_year": 1998,
    "director": "Steven Spielberg",
    "duration_mins": 169,
    "popularity": 96.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8x35f9U5IBlrCV3.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/rM5Y7Rj1P8K0l9aP1kLp9q2N8z8.jpg",
    "description": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    "genre_ids": [
      4,
      1
    ]
  },
  {
    "movie_id": 65,
    "title": "The Pianist",
    "release_year": 2002,
    "director": "Roman Polanski",
    "duration_mins": 150,
    "popularity": 92.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/2hFvxCCWrTmCYw2etEpLDL3Bbrz.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/8Y7Xp4z6f1L7tN4y58FfIwfJqWk.jpg",
    "description": "The true story of pianist Władysław Szpilman's miraculous survival in Warsaw during the German occupation in World War II.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 66,
    "title": "Schindler's List",
    "release_year": 1993,
    "director": "Steven Spielberg",
    "duration_mins": 195,
    "popularity": 97.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/zb6fM1CX41D9rZaUTdaR4563vS8.jpg",
    "description": "The true story of how industrialist Oskar Schindler saved over a thousand Jewish refugees from the Holocaust by employing them in his factories.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 67,
    "title": "The Wolf of Wall Street",
    "release_year": 2013,
    "director": "Martin Scorsese",
    "duration_mins": 180,
    "popularity": 95.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/cWUOv3H7YVwvU2vY3UjZ0b5b11r.jpg",
    "description": "A New York stockbroker refuses to cooperate in a large securities fraud case that involves corruption on Wall Street and the corporate banking world.",
    "genre_ids": [
      3,
      11,
      4
    ]
  },
  {
    "movie_id": 68,
    "title": "Django Unchained",
    "release_year": 2012,
    "director": "Quentin Tarantino",
    "duration_mins": 165,
    "popularity": 94.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/7oWY8vdWW7thTzWh3OKYRkWUlD5.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/2AuRhv22eU6a55p0iLp29f9e7h.jpg",
    "description": "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    "genre_ids": [
      4,
      1
    ]
  },
  {
    "movie_id": 69,
    "title": "Inglourious Basterds",
    "release_year": 2009,
    "director": "Quentin Tarantino",
    "duration_mins": 153,
    "popularity": 94.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/7sfbEnaARXDD5P0ms7ms1QdaUrn.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/8Y7Xp4z6f1L7tN4y58FfIwfJqWp.jpg",
    "description": "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    "genre_ids": [
      4,
      8,
      1
    ]
  },
  {
    "movie_id": 70,
    "title": "Casablanca",
    "release_year": 1942,
    "director": "Michael Curtiz",
    "duration_mins": 102,
    "popularity": 92.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L2.jpg",
    "description": "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    "genre_ids": [
      4,
      6
    ]
  },
  {
    "movie_id": 71,
    "title": "Back to the Future",
    "release_year": 1985,
    "director": "Robert Zemeckis",
    "duration_mins": 116,
    "popularity": 95.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1uAOx9i9b5hp.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49A9bK5Kq5b1V084P9h91B7b9.jpg",
    "description": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
    "genre_ids": [
      2,
      3,
      7
    ]
  },
  {
    "movie_id": 72,
    "title": "The Terminator",
    "release_year": 1984,
    "director": "James Cameron",
    "duration_mins": 107,
    "popularity": 92.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/oig9XwGz2y91gZ9aF6oP41tL0qM.jpg",
    "description": "A human soldier is sent from 2029 to 1984 to stop an almost invulnerable cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
    "genre_ids": [
      1,
      7,
      8
    ]
  },
  {
    "movie_id": 73,
    "title": "Terminator 2: Judgment Day",
    "release_year": 1991,
    "director": "James Cameron",
    "duration_mins": 137,
    "popularity": 95.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/5M0j0B18abtBI5fl24Rg9bh4W5U.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/8Y7Xp4z6f1L7tN4y58FfIwfJqWz.jpg",
    "description": "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from an even more advanced and powerful cyborg.",
    "genre_ids": [
      1,
      7,
      8
    ]
  },
  {
    "movie_id": 74,
    "title": "The Social Network",
    "release_year": 2010,
    "director": "David Fincher",
    "duration_mins": 120,
    "popularity": 91.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTpTzbR5YFmPt.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4HMUR4KvZ7r1qVp109wQp4P90aN.jpg",
    "description": "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 75,
    "title": "Arrival",
    "release_year": 2016,
    "director": "Denis Villeneuve",
    "duration_mins": 116,
    "popularity": 93.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vZ7EVk7FaJJY9P9y04dZ92b9qK3.jpg",
    "description": "Taking place after alien spacecraft touch down across the world, an elite team led by linguist Louise Banks is brought together to investigate the extraterrestrial arrivals.",
    "genre_ids": [
      4,
      7,
      10
    ]
  },
  {
    "movie_id": 76,
    "title": "Gone Girl",
    "release_year": 2014,
    "director": "David Fincher",
    "duration_mins": 149,
    "popularity": 92.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/qymaJhucquUwjpAC3Ho9aL8Swh9.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/1P3p8798q45K9B6L6yX7w8oP81M.jpg",
    "description": "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    "genre_ids": [
      4,
      8,
      10
    ]
  },
  {
    "movie_id": 77,
    "title": "The Sixth Sense",
    "release_year": 1999,
    "director": "M. Night Shyamalan",
    "duration_mins": 107,
    "popularity": 92.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/4AfSDjjCy6T5LAkox89FIABdqJa.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L3.jpg",
    "description": "A child psychologist tries to help a young boy who can communicate with spirits that do not know they are dead.",
    "genre_ids": [
      4,
      8,
      10
    ]
  },
  {
    "movie_id": 78,
    "title": "Ratatouille",
    "release_year": 2007,
    "director": "Brad Bird",
    "duration_mins": 111,
    "popularity": 94.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/t3vaWRPSf6W1nRk5wOSMm49tSbI.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/bUcuN8x7kX9vQ1B7b87c49A9bK6.jpg",
    "description": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.",
    "genre_ids": [
      9,
      3,
      2
    ]
  },
  {
    "movie_id": 79,
    "title": "Finding Nemo",
    "release_year": 2003,
    "director": "Andrew Stanton",
    "duration_mins": 100,
    "popularity": 94,
    "poster_url": "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69Tu8osAQmN.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/yUOXm4P7w8oP81L1P3p8798q45L.jpg",
    "description": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    "genre_ids": [
      9,
      2,
      3
    ]
  },
  {
    "movie_id": 80,
    "title": "Monsters, Inc.",
    "release_year": 2001,
    "director": "Pete Docter",
    "duration_mins": 92,
    "popularity": 93.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/sgheTgqAdfaGhV91F186j7w7u7a.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/nl79FQ8xWZyuL6gnvBTBzx9B9bG.jpg",
    "description": "In order to power the city, monsters have to scare children so that they scream. However, the children are toxic to the monsters after a child enters their factory.",
    "genre_ids": [
      9,
      3,
      12
    ]
  },
  {
    "movie_id": 81,
    "title": "Toy Story",
    "release_year": 1995,
    "director": "John Lasseter",
    "duration_mins": 81,
    "popularity": 94.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrFuMOGpn8.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49P85m2QoP84cQZ49874cM425.jpg",
    "description": "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
    "genre_ids": [
      9,
      3,
      2
    ]
  },
  {
    "movie_id": 82,
    "title": "Toy Story 3",
    "release_year": 2010,
    "director": "Lee Unkrich",
    "duration_mins": 103,
    "popularity": 93.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/AbbXspwhIRd7umfqZOBM0W1bNqV.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4y.jpg",
    "description": "The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it's up to Woody to convince the other toys they weren't abandoned.",
    "genre_ids": [
      9,
      3,
      2
    ]
  },
  {
    "movie_id": 83,
    "title": "Black Swan",
    "release_year": 2010,
    "director": "Darren Aronofsky",
    "duration_mins": 108,
    "popularity": 91.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/rH1nOmH49uyn1b453Kz8jL537j.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJL.jpg",
    "description": "A committed dancer wins the lead role in a production of Tchaikovsky's Swan Lake only to find herself struggling to maintain her sanity.",
    "genre_ids": [
      4,
      8
    ]
  },
  {
    "movie_id": 84,
    "title": "A Beautiful Mind",
    "release_year": 2001,
    "director": "Ron Howard",
    "duration_mins": 135,
    "popularity": 92.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/zwzWCmH72OSC79umsqrqBm1Ium8.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4qCqAdHcNUm48mFiCqn3dHFFepx.jpg",
    "description": "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.",
    "genre_ids": [
      4,
      6
    ]
  },
  {
    "movie_id": 85,
    "title": "Good Will Hunting",
    "release_year": 1997,
    "director": "Gus Van Sant",
    "duration_mins": 126,
    "popularity": 94.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/bABCBKYBK7A7GZ0t4OioN65v1Z1.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/c4j9aJqXk6v2o2m0V87y1B7h8f1.jpg",
    "description": "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
    "genre_ids": [
      4
    ]
  },
  {
    "movie_id": 86,
    "title": "The Green Mile",
    "release_year": 1999,
    "director": "Frank Darabont",
    "duration_mins": 189,
    "popularity": 95.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/8VG8fDNiy5087IRDoBGfKBZAvPp.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/rM5Y7Rj1P8K0l9aP1kLp9q2N8z9.jpg",
    "description": "A supernatural tale for the ages unfolding on death row in a Southern prison, where gentle giant John Coffey possesses a mysterious healing power.",
    "genre_ids": [
      4,
      11,
      12
    ]
  },
  {
    "movie_id": 87,
    "title": "The Intouchables",
    "release_year": 2011,
    "director": "Olivier Nakache, Éric Toledano",
    "duration_mins": 112,
    "popularity": 93.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/1QUB22qC1567u4pZ9210F5K0c0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/8Y7Xp4z6f1L7tN4y58FfIwfJqW1.jpg",
    "description": "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
    "genre_ids": [
      3,
      4
    ]
  },
  {
    "movie_id": 88,
    "title": "Amélie",
    "release_year": 2001,
    "director": "Jean-Pierre Jeunet",
    "duration_mins": 122,
    "popularity": 92.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/mFk4W6sHhXh2h8FhJ4x2q1b0F0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L4.jpg",
    "description": "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    "genre_ids": [
      3,
      6
    ]
  },
  {
    "movie_id": 89,
    "title": "The Grandmaster",
    "release_year": 2013,
    "director": "Wong Kar-wai",
    "duration_mins": 130,
    "popularity": 88.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/1X159Y4kZ6k1c6H7k8X0y1n0F0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49A9bK5Kq5b1V084P9h91B7c0.jpg",
    "description": "The story of martial-arts master Ip Man, the man who trained Bruce Lee, set against the backdrop of China's turbulent 1930s.",
    "genre_ids": [
      1,
      4
    ]
  },
  {
    "movie_id": 90,
    "title": "Crouching Tiger, Hidden Dragon",
    "release_year": 2000,
    "director": "Ang Lee",
    "duration_mins": 120,
    "popularity": 91.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/512966.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/oig9XwGz2y91gZ9aF6oP41tL0qN.jpg",
    "description": "A young Chinese warrior steals a sword from a famed swordsman and then embarks on a series of adventures with a mysterious man in the frontier.",
    "genre_ids": [
      1,
      2,
      4,
      6
    ]
  },
  {
    "movie_id": 91,
    "title": "Everything Everywhere All at Once",
    "release_year": 2022,
    "director": "Daniel Kwan, Daniel Scheinert",
    "duration_mins": 139,
    "popularity": 96.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/w3LxiVYPqRLexP07ApUdsqRwYq1.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0e0.jpg",
    "description": "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    "genre_ids": [
      1,
      2,
      3,
      7
    ]
  },
  {
    "movie_id": 92,
    "title": "Pan's Labyrinth",
    "release_year": 2006,
    "director": "Guillermo del Toro",
    "duration_mins": 118,
    "popularity": 92.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/7T1h2m3n4x5y6z7a8b9c0d1e2.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4HMUR4KvZ7r1qVp109wQp4P90aP.jpg",
    "description": "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.",
    "genre_ids": [
      4,
      12,
      10
    ]
  },
  {
    "movie_id": 93,
    "title": "The Shape of Water",
    "release_year": 2017,
    "director": "Guillermo del Toro",
    "duration_mins": 123,
    "popularity": 91.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/k4FwHlM0s0d4q1n0F0k1c6H7k8.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vZ7EVk7FaJJY9P9y04dZ92b9qK4.jpg",
    "description": "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.",
    "genre_ids": [
      4,
      6,
      12
    ]
  },
  {
    "movie_id": 94,
    "title": "Drive",
    "release_year": 2011,
    "director": "Nicolas Winding Refn",
    "duration_mins": 100,
    "popularity": 91.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/602vev0NX2ff2xw9zbOMhx5BzDH.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/1P3p8798q45K9B6L6yX7w8oP81N.jpg",
    "description": "A mysterious Hollywood stuntman and mechanic who moonlights as a getaway driver finds himself in trouble when he helps out his neighbor.",
    "genre_ids": [
      1,
      4,
      8,
      11
    ]
  },
  {
    "movie_id": 95,
    "title": "Nightcrawler",
    "release_year": 2014,
    "director": "Dan Gilroy",
    "duration_mins": 117,
    "popularity": 91.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/j9HrX8f7FuZQvGeSSox07kKq0K8.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L5.jpg",
    "description": "When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant to become the star of his own story.",
    "genre_ids": [
      11,
      4,
      8
    ]
  },
  {
    "movie_id": 96,
    "title": "Ex Machina",
    "release_year": 2014,
    "director": "Alex Garland",
    "duration_mins": 108,
    "popularity": 92.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/btbRB7BrD88799HA9QAQ9v120.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/bUcuN8x7kX9vQ1B7b87c49A9bK7.jpg",
    "description": "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
    "genre_ids": [
      4,
      7,
      8
    ]
  },
  {
    "movie_id": 97,
    "title": "Past Lives",
    "release_year": 2023,
    "director": "Celine Song",
    "duration_mins": 105,
    "popularity": 92.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/rzO7Ny7iY4lH90vQ9n8t0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/nl79FQ8xWZyuL6gnvBTBzx9B9bH.jpg",
    "description": "Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora's family emigrates from South Korea. Two decades later, they are reunited in New York for one fateful week.",
    "genre_ids": [
      4,
      6
    ]
  },
  {
    "movie_id": 98,
    "title": "The Batman",
    "release_year": 2022,
    "director": "Matt Reeves",
    "duration_mins": 176,
    "popularity": 95,
    "poster_url": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    "description": "When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    "genre_ids": [
      1,
      11,
      10,
      8
    ]
  },
  {
    "movie_id": 99,
    "title": "Dune: Part Two",
    "release_year": 2024,
    "director": "Denis Villeneuve",
    "duration_mins": 166,
    "popularity": 98.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9xY7xMm8f110c.jpg",
    "description": "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    "genre_ids": [
      7,
      2,
      1
    ]
  },
  {
    "movie_id": 100,
    "title": "Spider-Man: No Way Home",
    "release_year": 2021,
    "director": "Jon Watts",
    "duration_mins": 148,
    "popularity": 96.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
    "description": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man.",
    "genre_ids": [
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 101,
    "title": "Barbie",
    "release_year": 2023,
    "director": "Greta Gerwig",
    "duration_mins": 114,
    "popularity": 95.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/nHf61Uzkfza652aBR6M1bQk1w5o.jpg",
    "description": "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you're a Ken.",
    "genre_ids": [
      3,
      2
    ]
  },
  {
    "movie_id": 102,
    "title": "The Conjuring",
    "release_year": 2013,
    "director": "James Wan",
    "duration_mins": 112,
    "popularity": 91.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49A9bK5Kq5b1V084P9h91B7c1.jpg",
    "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their secluded farmhouse.",
    "genre_ids": [
      5,
      8
    ]
  },
  {
    "movie_id": 103,
    "title": "Midsommar",
    "release_year": 2019,
    "director": "Ari Aster",
    "duration_mins": 147,
    "popularity": 90.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/7LEI8ulhhTeB2gy0ewUW3ALBMq2.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/oig9XwGz2y91gZ9aF6oP41tL0qP.jpg",
    "description": "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent pagan cult competition.",
    "genre_ids": [
      5,
      4,
      10
    ]
  },
  {
    "movie_id": 104,
    "title": "The Notebook",
    "release_year": 2004,
    "director": "Nick Cassavetes",
    "duration_mins": 123,
    "popularity": 92.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/rNzQyW4f1B8cQegjbgNV5GtYAh.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0e1.jpg",
    "description": "An elderly man reads to a fellow nursing home resident the story of two young lovers who are torn apart by social differences and the onset of World War II.",
    "genre_ids": [
      6,
      4
    ]
  },
  {
    "movie_id": 105,
    "title": "Pride & Prejudice",
    "release_year": 2005,
    "director": "Joe Wright",
    "duration_mins": 129,
    "popularity": 91.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/sGjI2HiBmp8A4x5a7d8e6f1g0h2.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4HMUR4KvZ7r1qVp109wQp4P90aQ.jpg",
    "description": "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
    "genre_ids": [
      6,
      4
    ]
  },
  {
    "movie_id": 106,
    "title": "Before Sunrise",
    "release_year": 1995,
    "director": "Richard Linklater",
    "duration_mins": 101,
    "popularity": 91.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/kf1Jb1cs2flc4V47c6e5d2c0b1a.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vZ7EVk7FaJJY9P9y04dZ92b9qK5.jpg",
    "description": "A young man and an unconventional French woman meet on a train in Europe, and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
    "genre_ids": [
      6,
      4
    ]
  },
  {
    "movie_id": 107,
    "title": "Crazy Rich Asians",
    "release_year": 2018,
    "director": "Jon M. Chu",
    "duration_mins": 120,
    "popularity": 90.8,
    "poster_url": "https://image.tmdb.org/t/p/w500/1Xx5m8K9b0y1n0F0k1c6H7k8X0.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/1P3p8798q45K9B6L6yX7w8oP81P.jpg",
    "description": "This contemporary romantic comedy, based on a global bestseller, follows native New Yorker Rachel Chu to Singapore to meet her boyfriend's family.",
    "genre_ids": [
      3,
      6
    ]
  },
  {
    "movie_id": 108,
    "title": "Deadpool",
    "release_year": 2016,
    "director": "Tim Miller",
    "duration_mins": 108,
    "popularity": 94.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/3E53eWHrPyRfq7fH5W6P29J4tq.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L6.jpg",
    "description": "A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.",
    "genre_ids": [
      1,
      3
    ]
  },
  {
    "movie_id": 109,
    "title": "Knives Out: Glass Onion",
    "release_year": 2022,
    "director": "Rian Johnson",
    "duration_mins": 139,
    "popularity": 92.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/bUcuN8x7kX9vQ1B7b87c49A9bK8.jpg",
    "description": "Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.",
    "genre_ids": [
      3,
      10,
      11
    ]
  },
  {
    "movie_id": 110,
    "title": "How to Train Your Dragon",
    "release_year": 2010,
    "director": "Chris Sanders, Dean DeBlois",
    "duration_mins": 98,
    "popularity": 94.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqUo9xILfq9P4oR5.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/yUOXm4P7w8oP81L1P3p8798q45N.jpg",
    "description": "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
    "genre_ids": [
      9,
      2,
      12
    ]
  },
  {
    "movie_id": 111,
    "title": "Shrek",
    "release_year": 2001,
    "director": "Andrew Adamson, Vicky Jenson",
    "duration_mins": 90,
    "popularity": 93.7,
    "poster_url": "https://image.tmdb.org/t/p/w500/iB64vpL3dIObOtMZg3vuvHO8dcz.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/nl79FQ8xWZyuL6gnvBTBzx9B9bI.jpg",
    "description": "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a spirited princess for the lord in order to get his land back.",
    "genre_ids": [
      9,
      3,
      2,
      12
    ]
  },
  {
    "movie_id": 112,
    "title": "Moana",
    "release_year": 2016,
    "director": "Ron Clements, John Musker",
    "duration_mins": 107,
    "popularity": 93.4,
    "poster_url": "https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3AsUsRJ2xsne3N9.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7c49A9bK5Kq5b1V084P9h91B7c2.jpg",
    "description": "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
    "genre_ids": [
      9,
      2,
      12
    ]
  },
  {
    "movie_id": 113,
    "title": "Spider-Man 2",
    "release_year": 2004,
    "director": "Sam Raimi",
    "duration_mins": 127,
    "popularity": 94.3,
    "poster_url": "https://image.tmdb.org/t/p/w500/olxpyq9MgrKW3Q29Nzgy6f0739.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/oig9XwGz2y91gZ9aF6oP41tL0qQ.jpg",
    "description": "Peter Parker is beset with troubles in his failing personal life as he battles a brilliant scientist named Doctor Otto Octavius.",
    "genre_ids": [
      1,
      7
    ]
  },
  {
    "movie_id": 114,
    "title": "Iron Man",
    "release_year": 2008,
    "director": "Jon Favreau",
    "duration_mins": 126,
    "popularity": 95.1,
    "poster_url": "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0e2.jpg",
    "description": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    "genre_ids": [
      1,
      2,
      7
    ]
  },
  {
    "movie_id": 115,
    "title": "Casino Royale",
    "release_year": 2006,
    "director": "Martin Campbell",
    "duration_mins": 144,
    "popularity": 93.6,
    "poster_url": "https://image.tmdb.org/t/p/w500/r0vlX6krk8z6Nmsr0D49a2F4q7w.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/4HMUR4KvZ7r1qVp109wQp4P90aR.jpg",
    "description": "After earning 00 status and a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale.",
    "genre_ids": [
      1,
      8,
      2
    ]
  },
  {
    "movie_id": 116,
    "title": "Skyfall",
    "release_year": 2012,
    "director": "Sam Mendes",
    "duration_mins": 143,
    "popularity": 93.2,
    "poster_url": "https://image.tmdb.org/t/p/w500/1e5Wf218G1GzF8N7q2q4e7x8k1a.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/vZ7EVk7FaJJY9P9y04dZ92b9qK6.jpg",
    "description": "James Bond's loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.",
    "genre_ids": [
      1,
      8,
      2
    ]
  },
  {
    "movie_id": 117,
    "title": "Kill Bill: Vol. 1",
    "release_year": 2003,
    "director": "Quentin Tarantino",
    "duration_mins": 111,
    "popularity": 94,
    "poster_url": "https://image.tmdb.org/t/p/w500/v7TaX8kXMXSkWv045f4X1hH1q8v.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/1P3p8798q45K9B6L6yX7w8oP81Q.jpg",
    "description": "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
    "genre_ids": [
      1,
      11
    ]
  },
  {
    "movie_id": 118,
    "title": "Blade Runner",
    "release_year": 1982,
    "director": "Ridley Scott",
    "duration_mins": 117,
    "popularity": 92.5,
    "poster_url": "https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/9r1y1pW8X2P8F8yX4B8z6t1N9L7.jpg",
    "description": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
    "genre_ids": [
      7,
      4,
      8
    ]
  },
  {
    "movie_id": 119,
    "title": "Ford v Ferrari",
    "release_year": 2019,
    "director": "James Mangold",
    "duration_mins": 152,
    "popularity": 92.9,
    "poster_url": "https://image.tmdb.org/t/p/w500/6ApDtO7xaBYeg9ygvXAAI7yWBIf.jpg",
    "backdrop_url": "https://image.tmdb.org/t/p/original/bUcuN8x7kX9vQ1B7b87c49A9bK9.jpg",
    "description": "American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in 1966.",
    "genre_ids": [
      4,
      1
    ]
  }
];

export const SAMPLE_RATINGS = [
  {
    "rating_id": 1,
    "movie_id": 1,
    "rating": 5,
    "review": "Mind-bending masterpiece! Nolan at his absolute peak."
  },
  {
    "rating_id": 2,
    "movie_id": 1,
    "rating": 5,
    "review": "The soundtrack and visuals will stay with you forever."
  },
  {
    "rating_id": 3,
    "movie_id": 1,
    "rating": 4,
    "review": "Brilliant concept, though requires your full attention."
  },
  {
    "rating_id": 4,
    "movie_id": 2,
    "rating": 5,
    "review": "Heath Ledger's Joker is the greatest villain performance in cinema."
  },
  {
    "rating_id": 5,
    "movie_id": 2,
    "rating": 5,
    "review": "Elevated superhero films into prestige cinema."
  },
  {
    "rating_id": 6,
    "movie_id": 3,
    "rating": 5,
    "review": "Bawled my eyes out at the docking scene. Pure emotional science fiction."
  },
  {
    "rating_id": 7,
    "movie_id": 3,
    "rating": 5,
    "review": "Hans Zimmer's organ score is otherworldly."
  },
  {
    "rating_id": 8,
    "movie_id": 4,
    "rating": 5,
    "review": "Redefined action movies and philosophical sci-fi forever."
  },
  {
    "rating_id": 9,
    "movie_id": 5,
    "rating": 5,
    "review": "Dialogue so razor sharp it could cut glass."
  },
  {
    "rating_id": 10,
    "movie_id": 6,
    "rating": 5,
    "review": "The greatest redemption story ever put on celluloid."
  },
  {
    "rating_id": 11,
    "movie_id": 7,
    "rating": 4,
    "review": "Heartwarming, hilarious, and genuinely touching."
  },
  {
    "rating_id": 12,
    "movie_id": 8,
    "rating": 5,
    "review": "A cultural touchstone with one of cinema's best twists."
  },
  {
    "rating_id": 13,
    "movie_id": 9,
    "rating": 5,
    "review": "Miyazaki's animation is pure poetry."
  },
  {
    "rating_id": 14,
    "movie_id": 10,
    "rating": 5,
    "review": "Flawless thriller about class division."
  },
  {
    "rating_id": 15,
    "movie_id": 11,
    "rating": 5,
    "review": "The perfect emotional climax to an 11-year saga."
  },
  {
    "rating_id": 16,
    "movie_id": 12,
    "rating": 5,
    "review": "Are you not entertained? Outstanding spectacle!"
  },
  {
    "rating_id": 17,
    "movie_id": 13,
    "rating": 5,
    "review": "Tense as a piano wire. J.K. Simmons is terrifying."
  },
  {
    "rating_id": 18,
    "movie_id": 14,
    "rating": 5,
    "review": "Groundbreaking comic book art style and heart."
  },
  {
    "rating_id": 19,
    "movie_id": 15,
    "rating": 5,
    "review": "Remember Me made the entire room weep. Gorgeous colors."
  },
  {
    "rating_id": 20,
    "movie_id": 16,
    "rating": 5,
    "review": "Hopkins and Foster have unmatched psychological chemistry."
  },
  {
    "rating_id": 21,
    "movie_id": 17,
    "rating": 5,
    "review": "Grim, unrelenting, and unforgettable ending."
  },
  {
    "rating_id": 22,
    "movie_id": 19,
    "rating": 5,
    "review": "Massive scale and auditory marvel. Denis Villeneuve delivered."
  },
  {
    "rating_id": 23,
    "movie_id": 20,
    "rating": 4,
    "review": "Visually stunning sequel worthy of the original."
  },
  {
    "rating_id": 24,
    "movie_id": 25,
    "rating": 5,
    "review": "The Trinity test scene shook the theater seats."
  },
  {
    "rating_id": 25,
    "movie_id": 41,
    "rating": 5,
    "review": "A bittersweet love letter to dreamers."
  },
  {
    "rating_id": 26,
    "movie_id": 42,
    "rating": 5,
    "review": "Epic in every single sense of the word."
  },
  {
    "rating_id": 27,
    "movie_id": 56,
    "rating": 5,
    "review": "Two hours of non-stop adrenaline and practical effects."
  },
  {
    "rating_id": 28,
    "movie_id": 93,
    "rating": 5,
    "review": "Insanely creative, hilarious, and deeply emotional."
  }
];
