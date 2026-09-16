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
      "El 10% de las ventas se dona a la Fundación Baby Bear, ayudando a familias en duelo.",
      "La pulsera llega en un empaque cuidado e incluye esta tarjeta.",
      "Lissa Gail diseñó esta pulsera especialmente para la Fundación Baby Bear, como parte de su programa \"Lissa Gail Gives Back\".",
      "Con cada compra, el 10% de lo recaudado se dona a la Fundación Baby Bear, acompañando a las familias en su pérdida con compasión, cuidado y esperanza.",
    ],
    cardImage: imgTarjeta,
    purchaseUrl: "https://lissagail.co/products/baby-bear-bracelet",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
