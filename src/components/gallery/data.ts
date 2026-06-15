export type GalleryItem = {
  img: string;
  title: string;
  locked: boolean;
};

const CDN = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/optimized";

export const GALLERY: GalleryItem[] = [
  { img: `${CDN}/25ebae46-7ba9-4578-bf0d-143b11e13dd7.jpg`, title: "Прогулка", locked: false },
  { img: `${CDN}/6cb55b51-beaf-4c4b-9929-88ec189dcc88.jpg`, title: "Сцена", locked: false },
  { img: `${CDN}/9fc2dbd6-6a08-418e-9843-54336b1f1d73.jpg`, title: "Грация", locked: false },
  { img: `${CDN}/d7bec23c-93fa-4969-bdcd-be1720513233.jpg`, title: "Этюд", locked: false },
  { img: `${CDN}/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg`, title: "Взгляд", locked: false },
  { img: `${CDN}/3138f5f3-691c-46f7-b827-5eec91cdebe7.jpg`, title: "Корсет", locked: false },
  { img: `${CDN}/15ce670a-19b9-4685-b85f-76e994429bf1.jpg`, title: "Профиль", locked: false },
  { img: `${CDN}/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg`, title: "Энергия", locked: false },
  { img: `${CDN}/613e002a-001c-4a4e-912f-90b75833213c.jpg`, title: "Портрет", locked: false },
  { img: `${CDN}/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg`, title: "Лёгкость", locked: false },
];

export const LIKES_KEY = "sg_gallery_likes_v1";
