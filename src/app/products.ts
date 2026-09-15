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
      "Compra esta pulsera para alguien que amas — mamás, abuelas o niñas. Es un regalo hecho con intención para cualquier ocasión, y también un regalo con significado para una madre o hija que atraviesa un duelo.",
      "Lissa Gail diseñó esta pulsera especialmente para la Fundación Baby Bear, como parte de su programa \"Lissa Gail Gives Back\".",
    ],
    cardImage: imgTarjeta,
    // TODO: reemplazar por la URL real de venta (Shopify, Etsy, etc.)
    purchaseUrl: "https://example.com/pulsera-baby-bear",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
