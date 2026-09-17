export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  images: string[];
  poem: string[];
  story: string[];
  cardImage: string;
  donationPercent: number;
  purchaseUrl: string;
  en: {
    name: string;
    tagline: string;
    story: string[];
  };
};

import imgTarjeta from "../imports/ProductoPulsera/tarjeta-baby-bear.png";
import imgPulsera from "../imports/Productos/pulsera-baby-bear.jpg";

export const PRODUCTS: Product[] = [
  {
    slug: "pulsera-baby-bear",
    name: "Pulsera Baby Bear",
    tagline: "Un pequeño recordatorio, cerca del corazón",
    price: 68,
    currency: "USD",
    donationPercent: 10,
    images: [imgPulsera],
    poem: [
      "A little bear,",
      "a shining star,",
      "held close with love,",
      "no matter how far.",
      "",
      "Forever and always,",
      "with all of my heart,",
      "a love that lives on,",
      "never apart.",
    ],
    story: [
      "Compra esta pulsera para alguien que amas: mamás, abuelas o niñas. Es un regalo pensado para cualquier ocasión y también un regalo con significado para una madre o una hija que atraviesa un duelo.",
      "Con cada compra, el 10% de lo recaudado se dona a la Fundación Baby Bear, acompañando a las familias en su pérdida con compasión, cuidado y esperanza.",
      "La pulsera llega en un empaque cuidado e incluye esta tarjeta.",
      "Lissa Gail diseñó esta pulsera especialmente para la Fundación Baby Bear, como parte de su programa \"Lissa Gail Gives Back\".",
    ],
    cardImage: imgTarjeta,
    purchaseUrl: "https://lissagail.co/products/baby-bear-bracelet",
    en: {
      name: "Baby Bear Bracelet",
      tagline: "A little reminder, close to the heart",
      story: [
        "Get this bracelet for someone you love: moms, grandmothers, or daughters. It's a gift for any occasion, and also a meaningful gift for a mother or daughter going through grief.",
        "With every purchase, 10% of proceeds is donated to the Baby Bear Foundation, supporting families through loss with compassion, care, and hope.",
        "The bracelet arrives in thoughtful packaging and includes this card.",
        "Lissa Gail designed this bracelet especially for the Baby Bear Foundation, as part of her \"Lissa Gail Gives Back\" program.",
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
