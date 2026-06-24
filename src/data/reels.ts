import { asset, videoAsset } from "@/lib/assets";

export type PgpReel = {
  id: string;
  image: string;
  video: string;
  caption: string;
  tag: string;
  instagramUrl: string;
};

export const pgpReels: PgpReel[] = [
  {
    id: "dzkdz",
    image: asset("images/pgp-reels/ig-reel-dzkdzios021.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dzkdzios021.mp4"),
    caption: "How learning works at Hive",
    tag: "Learning",
    instagramUrl: "https://www.instagram.com/reel/DZKdzIOS021/",
  },
  {
    id: "duizk",
    image: asset("images/pgp-reels/ig-reel-duizkegknq6.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-duizkegknq6.mp4"),
    caption: "Inside the revenue sprint",
    tag: "Learning",
    instagramUrl: "https://www.instagram.com/reel/DUIzkEgknQ6/",
  },
  {
    id: "dzake",
    image: asset("images/pgp-reels/ig-reel-dzakeghskjx.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dzakeghskjx.mp4"),
    caption: "B2B revenue in practice",
    tag: "B2B / D2C",
    instagramUrl: "https://www.instagram.com/reel/DZaKeghSkjx/",
  },
  {
    id: "dzcdv",
    image: asset("images/pgp-reels/ig-reel-dzcdvwrbkpg.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dzcdvwrbkpg.mp4"),
    caption: "D2C brand building sprint",
    tag: "B2B / D2C",
    instagramUrl: "https://www.instagram.com/reel/DZCdVWRBKPg/",
  },
  {
    id: "dx6w",
    image: asset("images/pgp-reels/ig-reel-dx6w.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dx6w.mp4"),
    caption: "C2 × Blabliblu challenge",
    tag: "Challenge",
    instagramUrl: "https://www.instagram.com/reel/DX6w08dy7oh/",
  },
  {
    id: "dssss",
    image: asset("images/pgp-reels/ig-reel-dssssx-errd.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dssssx-errd.mp4"),
    caption: "Capstone presentations",
    tag: "Capstone",
    instagramUrl: "https://www.instagram.com/reel/DSSSsX-ErRD/",
  },
  {
    id: "drczh",
    image: asset("images/pgp-reels/ig-reel-drczhx4eifz.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-drczhx4eifz.mp4"),
    caption: "Final capstone pitch day",
    tag: "Capstone",
    instagramUrl: "https://www.instagram.com/reel/DRCZHx4EiFZ/",
  },
  {
    id: "dxzk",
    image: asset("images/pgp-reels/ig-reel-dxzk.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dxzk.mp4"),
    caption: "PGP C2 Orientation",
    tag: "Orientation",
    instagramUrl: "https://www.instagram.com/reel/DXzKL9rS1VZ/",
  },
  {
    id: "dxoq",
    image: asset("images/pgp-reels/ig-reel-dxoq.jpg"),
    video: videoAsset("videos/pgp-reels/ig-reel-dxoq.mp4"),
    caption: "Class of 2027 · Day 1",
    tag: "Orientation",
    instagramUrl: "https://www.instagram.com/reel/DXoqdteEoSP/",
  },
];

export const hiveInstagramUrl = "https://www.instagram.com/hiveschool.co/";

export function getReelsByIds(ids: string[]): PgpReel[] {
  return ids
    .map((id) => pgpReels.find((reel) => reel.id === id))
    .filter((reel): reel is PgpReel => reel !== undefined);
}

/** Pedagogy layer reels — How learning works · B2B/D2C · Capstone */
export const pedagogyLayerReels = {
  learn: getReelsByIds(["dzkdz", "duizk", "dx6w"]),
  build: getReelsByIds(["dzake", "dzcdv", "dxzk"]),
  pitch: getReelsByIds(["dssss", "drczh"]),
} as const;
