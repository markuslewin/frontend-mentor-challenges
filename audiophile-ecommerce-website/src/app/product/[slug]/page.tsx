import products from "~/app/product/[slug]/_data/data.json";

export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug)!;

  return <h1>Product: {product.name}</h1>;
}

// Home
// Headphones
// Speakers
// Earphones

// Go back

// New product

// ZX9 Speaker
// Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker
// system that offers truly wireless connectivity -- creating new possibilities for more
// pleasing and practical audio setups.

// $4,500
// 1
// Add to cart

// Features
// Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial,
// USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices
// connected for easy switching. Improved bluetooth technology offers near lossless audio quality at
// up to 328ft (100m).

// Discover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm
// tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass
// unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you
// will experience new sensations from old songs since it can respond to even the subtle waveforms.

// In the box

// 2x Speaker unit
// 2x Speaker cloth panel
// 1x User manual
// 1x 3.5mm 10m audio cable
// 1x 10m optical cable

// You may also like

// ZX7 Speaker
// See product

// XX99 Mark I
// See product

// XX59
// See product

// Headphones
// Shop

// Speakers
// Shop

// Earphones
// Shop

// Bringing you the best audio gear
// Located at the heart of New York City, Audiophile is the premier store for high end headphones,
// earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
// rooms available for you to browse and experience a wide range of our products. Stop by our store
// to meet some of the fantastic people who make Audiophile the best place to buy your portable
// audio equipment.

// Home
// Headphones
// Speakers
// Earphones

// Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers
// and sound specialists who are devoted to helping you get the most out of personal audio. Come and
// visit our demo facility - we’re open 7 days a week.

// Copyright 2021. All Rights Reserved
