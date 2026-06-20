// import type { FC } from 'react';
// import { Link } from 'react-router-dom';

// export const Home: FC = () => {
//   return (
//     <div className="bg-black text-white">
//       <section className="bg-black py-24">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <p className="text-brand font-semibold uppercase tracking-[0.4em] mb-4">Kilo Biryani</p>
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
//             <span className="text-brand">Kilo</span>{' '}
//             <span className="text-white">Biryani</span>
//           </h1>
//           <p className="text-gray-300 text-xl mb-8">Premium biryani served hot with authentic spices and a bold flavor.</p>
//           <Link to="/menu" className="btn-primary inline-block">
//             Order Now
//           </Link>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kilo Biryani?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-surface2 p-8 rounded-3xl text-center card-border">
//             <div className="text-4xl mb-4">🍛</div>
//             <h3 className="text-xl font-semibold mb-2">Authentic Flavor</h3>
//             <p className="text-gray-400">Rich biryani cooked with premium ingredients and aromatic spices.</p>
//           </div>
//           <div className="bg-surface2 p-8 rounded-3xl text-center card-border">
//             <div className="text-4xl mb-4">⚡</div>
//             <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//             <p className="text-gray-400">Hot, fresh biryani delivered quickly in the right portion size.</p>
//           </div>
//           <div className="bg-surface2 p-8 rounded-3xl text-center card-border">
//             <div className="text-4xl mb-4">💰</div>
//             <h3 className="text-xl font-semibold mb-2">Clear Pricing</h3>
//             <p className="text-gray-400">Choose between per plate, per KG, or 1.5 KG options.</p>
//           </div>
//         </div>
//       </section>

//       <section className="bg-surface py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Taste the Best?</h2>
//           <p className="text-gray-400 mb-8">Start your order and enjoy authentic biryani crafted for every appetite.</p>
//           <Link to="/menu" className="btn-primary inline-block">
//             Explore Menu
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };


import type { FC } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🫕',
    title: 'Authentic dum method',
    body: 'Sealed with dough and slow-cooked so every grain of rice absorbs the full depth of the masala.',
  },
  {
    icon: '🛵',
    title: 'Hot on delivery',
    body: 'Insulated handi containers hold heat for up to 40 minutes — arrives exactly as intended.',
  },
  {
    icon: '⚖️',
    title: 'Order by weight',
    body: 'Per plate, 1 KG, or 1.5 KG — choose what fits your table. Pricing is clear upfront.',
  },
];

const varieties = [
  {
    tag: 'Most ordered',
    name: 'Chicken Dum',
    desc: 'Whole masala-marinated pieces on the bone, slow-cooked with long-grain basmati.',
  },
  {
    tag: 'Bestseller',
    name: 'Mutton Kilo',
    desc: 'Slow-cooked mutton that falls off the bone. Rich, heavy, and deeply spiced.',
  },
  {
    tag: "Chef's pick",
    name: 'Veg Handi',
    desc: 'Seasonal vegetables with paneer in a saffron-infused basmati — no shortcuts.',
  },
];

const stats = [
  { num: '1 KG',   label: 'minimum serves two' },
  { num: '45 min', label: 'avg delivery' },
  { num: '12+',    label: 'whole spices' },
  { num: '4.9 ★',  label: 'customer rating' },
];

const displayFont = { fontFamily: 'var(--font-display)' } as const;

export const Home: FC = () => {
  return (
    <div className="bg-[#0C0A08] text-[#F5EDD8]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(250,204,21,0.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="hidden md:flex absolute top-8 right-10 w-24 h-24 rounded-full border border-brand/20 items-center justify-center opacity-50"
          aria-hidden="true"
        >
          <span style={displayFont} className="text-[11px] text-brand leading-tight text-center">
            Kilo<br />Biryani
          </span>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block text-brand text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Ek Kilo Pyaar, Ek Kilo Swaad
          </span>

          <h1
            style={displayFont}
            className="font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-[-0.02em] text-[#F5EDD8] mb-5"
          >
            Biryani that<br />
            <em className="text-brand not-italic">hits different.</em>
          </h1>

          <p className="font-sans text-[#B5A88A] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Dum-cooked over slow fire. Layered with saffron, caramelised onions, and spices
            sourced straight from Nizamabad — then brought to your door still steaming.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/menu" className="btn-primary">Order now</Link>
            <Link
              to="/menu"
              className="text-[#B5A88A] text-sm font-medium border-b border-brand/30 pb-0.5 hover:text-brand hover:border-brand transition-colors duration-150"
            >
              See the menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <div className="bg-[#141210] border-y border-white/[0.06] flex flex-wrap">
        {stats.map((s, i) => (
          <div
            key={s.num}
            className={`flex flex-col items-center justify-center gap-1 px-6 py-5 flex-1 basis-36 ${
              i < stats.length - 1 ? 'border-r border-white/[0.06]' : ''
            }`}
          >
            <span style={displayFont} className="font-bold text-2xl sm:text-3xl text-brand leading-none">
              {s.num}
            </span>
            <span className="text-[#B5A88A] text-[11px] tracking-wide text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Why Us ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
        <span className="section-eyebrow">Why Kilo Biryani</span>
        <h2
          style={displayFont}
          className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#F5EDD8] leading-snug mb-10 max-w-md"
        >
          Cooked the hard way.<br />
          Because shortcuts show.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <article key={f.title} className="card-feature">
              <span className="text-3xl mb-5 block">{f.icon}</span>
              <h3 className="text-[#F5EDD8] font-semibold text-base mb-2 leading-snug">{f.title}</h3>
              <p className="text-[#B5A88A] text-sm leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Varieties ── */}
      <section className="bg-[#080605] px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <span className="section-eyebrow !text-brand-dark">What's in the pot</span>
          <h2
            style={displayFont}
            className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-snug mb-10 max-w-sm"
          >
            Pick your biryani.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {varieties.map((v) => (
              <article key={v.name} className="card-variety">
                <span className="inline-block bg-brand/10 text-brand text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-md w-fit">
                  {v.tag}
                </span>
                <h3 style={displayFont} className="font-bold text-xl text-[#F5EDD8] leading-snug">
                  {v.name}
                </h3>
                <p className="text-[#B5A88A] text-sm leading-relaxed flex-1">{v.desc}</p>
                <Link
                  to="/menu"
                  className="text-brand text-sm font-semibold mt-1 hover:text-brand-dark transition-colors duration-150"
                >
                  View on menu →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="px-4 sm:px-6 py-16 sm:py-24 border-t border-brand/10 text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a08 0%, #0C0A08 60%)' }}
      >
        <div className="max-w-lg mx-auto">
          <h2
            style={displayFont}
            className="font-bold text-4xl sm:text-5xl text-[#F5EDD8] mb-4 leading-tight"
          >
            Ready to order?
          </h2>
          <p className="text-[#B5A88A] text-base leading-relaxed mb-8">
            Minimum 1 KG. No advance needed. Hot delivery, seven days a week.
          </p>
          <Link to="/menu" className="btn-primary !px-10 !py-4 !text-base">
            Explore the full menu
          </Link>
        </div>
      </section>

    </div>
  );
};