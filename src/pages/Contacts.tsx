import PageLayout from "@/components/PageLayout";

const PHOTO = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/8c41251d-ce6d-439d-b64c-a1b243cee08a.jpg";

export default function Contacts() {
  return (
    <PageLayout>
      {/* Шапка с фото на всю ширину */}
      <div className="relative overflow-hidden h-64 md:h-80 mb-12">
        <img src={PHOTO} alt="Контакты" className="w-full h-full object-cover object-top opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="font-cormorant text-6xl md:text-7xl italic font-semibold"
            style={{ color: "#fff", textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}
          >
            Контакты
          </h1>
        </div>
      </div>

      <div className="px-8 md:px-16">
        {/* Контактная информация */}
        <div className="flex flex-col items-center gap-8">
          <a
            href="tel:+79179865198"
            className="flex items-center gap-4 group"
          >
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