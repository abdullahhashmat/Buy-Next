"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };
``
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= HEADER ================= */}
      <section className="border-b border-[#222] px-5 py-14 md:px-10 md:py-18 lg:px-16">

        <div className="mx-auto max-w-[1200px]">

          <p className="mb-4 text-[10px] uppercase tracking-[5px] text-[#C6A15B]">
            Get In Touch
          </p>

          <h1 className="text-4xl font-light uppercase tracking-[-1px] md:text-6xl">
            Contact Us
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
            Have a question about a product, your order, or anything
            else? We'd love to hear from you.
          </p>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}
      <section className="px-5 py-12 md:px-10 md:py-16 lg:px-16">

        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">


          {/* ================= CONTACT INFO ================= */}
          <div>

            <h2 className="text-2xl font-light uppercase md:text-3xl">
              Let's Talk
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
              Our team is here to help. Reach out to us through any
              of the options below.
            </p>


            <div className="mt-8 border-t border-[#222]">

              {/* Email */}
              <div className="flex items-center gap-4 border-b border-[#222] py-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#333] text-[#C6A15B]">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[3px] text-white/30">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    support@buynext.com
                  </p>
                </div>

              </div>


              {/* Phone */}
              <div className="flex items-center gap-4 border-b border-[#222] py-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#333] text-[#C6A15B]">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[3px] text-white/30">
                    Phone / WhatsApp
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    03260596245
                  </p>
                </div>

              </div>


              {/* Location */}
              <div className="flex items-center gap-4 py-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#333] text-[#C6A15B]">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[3px] text-white/30">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    Lahore, Pakistan
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* ================= FORM ================= */}
          <div className="border border-[#222] bg-[#090909]">

            {submitted ? (

              <div className="flex min-h-[450px] flex-col items-center justify-center px-6 text-center md:px-10">

                <div className="flex h-16 w-16 items-center justify-center border border-[#C6A15B] text-[#C6A15B]">
                  <Send size={22} />
                </div>

                <p className="mt-6 text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                  Thank You
                </p>

                <h2 className="mt-3 text-2xl font-light uppercase">
                  Message Sent
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-7 text-white/40">
                  Thank you for contacting us. We will get back to
                  you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 border border-[#333] px-6 py-3 text-[9px] uppercase tracking-[3px] text-white/70 transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
                >
                  Send Another
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-9"
              >

                <div className="flex items-center justify-between border-b border-[#222] pb-5">

                  <div>

                    <p className="text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                      Contact Form
                    </p>

                    <h2 className="mt-2 text-xl font-light uppercase">
                      Send Us A Message
                    </h2>

                  </div>

                  <Send
                    size={18}
                    className="text-white/20"
                  />

                </div>


                <div className="mt-7 space-y-5">

                  {/* Name */}
                  <div>

                    <label className="mb-2 block text-[8px] uppercase tracking-[3px] text-white/35">
                      Name
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-[#292929] bg-[#050505] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#C6A15B]"
                    />

                  </div>


                  {/* Email */}
                  <div>

                    <label className="mb-2 block text-[8px] uppercase tracking-[3px] text-white/35">
                      Email
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full border border-[#292929] bg-[#050505] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#C6A15B]"
                    />

                  </div>


                  {/* Message */}
                  <div>

                    <label className="mb-2 block text-[8px] uppercase tracking-[3px] text-white/35">
                      Message
                    </label>

                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full resize-none border border-[#292929] bg-[#050505] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#C6A15B]"
                    />

                  </div>


                  {/* Button */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 bg-[#C6A15B] py-4 text-[10px] font-semibold uppercase tracking-[3px] text-black transition duration-300 hover:bg-[#D4B875]"
                  >
                    Send Message

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}