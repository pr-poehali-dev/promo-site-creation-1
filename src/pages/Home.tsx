const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

export default function Home() {
  return (
    <div className="grain min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: "hsl(204,60%,10%)" }} />
      </div>

      <div className="relative z-10 px-8 md:px-16 py-4">
        <span
          className="font-cormorant text-4xl italic"
          style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}
        >
          Сладкие Грёзы
        </span>
      </div>
    </div>
  );
}