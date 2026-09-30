import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-[#222] px-5 py-16 md:px-10 md:py-20 lg:px-16">

        <div className="absolute right-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#C6A15B]/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px]">

          <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">

            <div>

              <p className="mb-5 text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
                About BUY NEXT
              </p>

              <h1 className="max-w-4xl text-5xl font-light uppercase leading-[0.95] tracking-[-2px] md:text-7xl lg:text-8xl">
                More than
                <br />
                <span className="text-white/35">just shopping.</span>
              </h1>

            </div>

            <div className="border-l border-[#333] pl-6 md:mb-2">

              <p className="text-sm leading-7 text-white/50">
                A modern shopping experience built around
                simplicity, style and the products people actually
                want.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BRAND STORY ================= */}
      <section className="border-b border-[#222] bg-[#090909] px-5 py-14 md:px-10 md:py-16 lg:px-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">

            <div>

              <p className="text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
                01 — Our Story
              </p>

              <h2 className="mt-4 text-3xl font-light uppercase tracking-wide md:text-5xl">
                Designed for
                <br />
                <span className="text-white/35">modern living.</span>
              </h2>

            </div>


            <div className="max-w-2xl space-y-5 text-sm leading-7 text-white/50 md:text-base">

              <p>
                BUY NEXT was created with one simple idea:
                shopping online should feel effortless.
              </p>

              <p>
                We bring together carefully selected products in
                a clean and modern environment where discovering
                something you like feels natural.
              </p>

              <p>
                From the first click to the final order, every part
                of the experience is designed to stay simple,
                clear and enjoyable.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= NUMBERS ================= */}
      <section className="border-b border-[#222] px-5 py-12 md:px-10 lg:px-16">

        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-[#222] md:grid-cols-4">

          <div className="px-5 py-3 md:px-8">

            <p className="text-3xl font-light md:text-4xl">
              01
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[3px] text-white/35">
              Simple Experience
            </p>

          </div>


          <div className="px-5 py-3 md:px-8">

            <p className="text-3xl font-light md:text-4xl">
              02
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[3px] text-white/35">
              Curated Products
            </p>

          </div>


          <div className="px-5 py-3 md:px-8">

            <p className="text-3xl font-light md:text-4xl">
              03
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[3px] text-white/35">
              Modern Design
            </p>

          </div>


          <div className="px-5 py-3 md:px-8">

            <p className="text-3xl font-light md:text-4xl">
              04
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[3px] text-white/35">
              Customer Focus
            </p>

          </div>

        </div>

      </section>


      {/* ================= VALUES ================= */}
      <section className="px-5 py-14 md:px-10 md:py-16 lg:px-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-8 flex items-end justify-between border-b border-[#222] pb-5">

            <div>

              <p className="mb-2 text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
                02 — What Matters
              </p>

              <h2 className="text-2xl font-light uppercase tracking-wide md:text-4xl">
                Our Approach
              </h2>

            </div>

          </div>


          <div className="grid gap-px overflow-hidden border border-[#222] bg-[#222] md:grid-cols-3">

            <div className="group bg-[#080808] p-7 transition duration-300 hover:bg-[#0d0d0d] md:p-9">

              <p className="text-[9px] tracking-[3px] text-[#C6A15B]">
                01
              </p>

              <h3 className="mt-10 text-xl font-light uppercase">
                Quality
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/40">
                We focus on products that offer value,
                usefulness and a reason to be part of your
                everyday life.
              </p>

            </div>


            <div className="group bg-[#080808] p-7 transition duration-300 hover:bg-[#0d0d0d] md:p-9">

              <p className="text-[9px] tracking-[3px] text-[#C6A15B]">
                02
              </p>

              <h3 className="mt-10 text-xl font-light uppercase">
                Simplicity
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/40">
                No unnecessary complexity. From browsing to
                checkout, we keep the experience clean and easy.
              </p>

            </div>


            <div className="group bg-[#080808] p-7 transition duration-300 hover:bg-[#0d0d0d] md:p-9">

              <p className="text-[9px] tracking-[3px] text-[#C6A15B]">
                03
              </p>

              <h3 className="mt-10 text-xl font-light uppercase">
                You First
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/40">
                Every detail is built around making your
                shopping journey comfortable and straightforward.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATEMENT ================= */}
      <section className="border-y border-[#222] bg-[#090909] px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
            The BUY NEXT Philosophy
          </p>

          <h2 className="mt-5 text-3xl font-light uppercase leading-tight tracking-[-1px] md:text-5xl">
            Less complexity.
            <br />
            <span className="text-white/35">
              More of what you love.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
            We believe good shopping does not need to be complicated.
            It should be simple, thoughtful and made around you.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-5 py-14 md:px-10 md:py-16">

        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-7 border border-[#222] bg-[#080808] px-7 py-10 md:flex-row md:px-12">

          <div>

            <p className="text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
              BUY NEXT
            </p>

            <h2 className="mt-3 text-2xl font-light uppercase md:text-3xl">
              Find your next favorite.
            </h2>

          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 border border-[#C6A15B] px-7 py-3.5 text-[9px] font-medium uppercase tracking-[3px] text-[#C6A15B] transition duration-300 hover:bg-[#C6A15B] hover:text-black"
          >
            Explore Shop
          </Link>

        </div>

      </section>

    </main>
  );
}