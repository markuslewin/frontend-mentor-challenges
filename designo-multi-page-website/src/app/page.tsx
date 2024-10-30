import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <h1 className="text-h1">
        Award-winning custom designs and digital branding solutions
      </h1>
      <p>
        With over 10 years in the industry, we are experienced in creating fully
        responsive websites, app design, and engaging brand experiences. Find
        out more about our services.
      </p>
      <h2 className="text-h2 uppercase">Web design</h2>
      <h3 className="text-h3">Passionate</h3>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/app-design">App Design</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/graphic-design">Graphic Design</Link>
        </li>
        <li>
          <Link href="/locations">Locations</Link>
        </li>
        <li>
          <Link href="/web-design">Web Design</Link>
        </li>
      </ul>
    </main>
  );
}
