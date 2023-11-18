import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  interface LinkItem {
    href: string;
    text: string;
  }
  const linkItems: LinkItem[] = [
    { href: '/docx_analisis', text: 'DOCX' },
    { href: '/video_analisis', text: 'YOUTUBE' },
    // { href: '/text', text: 'TEXT' },
    // Afegeix més enllaços aquí segons sigui necessari
  ];

  return (<>
    <div className="flex flex-col justify-center items-center h-screen">

      <h1 className="text-center text-white text-3xl">ELIGE INPUT</h1>
      <div className="flex  flex-row items-center justify-center gap-4 p-24">
        {linkItems.map((link, index) => (
          <Link key={index} href={link.href} className="py-2 px-4 bg-slate-100 text-slate-900 hover:text-slate-100 hover:bg-slate-600 rounded-2xl">
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  </>
  )
}
