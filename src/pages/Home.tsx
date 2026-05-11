import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="grain min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: "hsl(204,60%,10%)" }} />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-8 z-10 flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-200"
      >
        <Icon name="ArrowLeft" size={18} />
        <span className="font-mono text-xs tracking-widest uppercase">Назад</span>
      </button>
    </div>
  );
}
