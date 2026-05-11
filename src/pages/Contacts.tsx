import PageLayout from "@/components/PageLayout";

export default function Contacts() {
  return (
    <PageLayout noBackground>
      <div className="px-8 md:px-16 py-16">
        <div className="flex flex-col items-center gap-8">
          <a href="tel:+79179865198" onClick={e => e.stopPropagation()} className="flex items-center gap-4 group">
            <span className="text-2xl">📞</span>
            <span
              className="font-cormorant text-3xl md:text-4xl italic tracking-wide group-hover:text-accent transition-colors duration-300"
              style={{ color: "#fff" }}
            >
              8 (917) 986-51-98
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <span
              className="font-cormorant text-2xl md:text-3xl italic"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              г. Саратов
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}