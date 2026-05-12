import PageLayout from "@/components/PageLayout";

const BG_IMAGE = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/6630b2d3-52cb-4fb4-bc6d-c7badbb528bf.jpg";

export default function Contacts() {
  return (
    <PageLayout
      backgroundSlot={
        <>
          <img
            src={BG_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-85"
            style={{
              objectPosition: "65% 25%",
              filter: "contrast(1.08) saturate(1.12) brightness(0.92)",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.5)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,200,90,0.4) 0%, rgba(255,160,50,0.18) 35%, transparent 55%, rgba(180,20,30,0.3) 100%)", mixBlendMode: "overlay" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 22%, rgba(255,210,120,0.3) 0%, transparent 35%)", mixBlendMode: "screen" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 35%, transparent 55%, rgba(10,10,10,0.7) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)" }} />
        </>
      }
    >
      <div className="px-8 md:px-16 py-16">
        <div className="flex flex-col items-center gap-8">
          <a href="tel:+79179865198" onClick={e => e.stopPropagation()} className="flex items-center gap-4 group">
            <span className="text-2xl">📞</span>
            <span
              className="font-cormorant text-3xl md:text-4xl italic tracking-wide group-hover:text-accent transition-colors duration-300"
              style={{ color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              8 (917) 986-51-98
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <span
              className="font-cormorant text-2xl md:text-3xl italic"
              style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 16px rgba(0,0,0,0.75)" }}
            >
              г. Саратов
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}