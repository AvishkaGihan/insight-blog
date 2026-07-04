import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="p-28 flex items-center bg-gradient-cyber min-h-[calc(100vh-100px)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto flex justify-center items-center flex-col gap-6 p-3 relative z-10 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-gradient">Projects</h1>
        <p className="text-md text-text-muted">
          Build fun and engaging projects while learning HTML, CSS, and
          JavaScript!
        </p>
        <CallToAction />
      </div>
    </div>
  );
}
