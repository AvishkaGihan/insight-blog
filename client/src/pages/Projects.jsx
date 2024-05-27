import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="p-28 flex items-center bg-green-600">
      <div className="max-w-4xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
        <h1 className="text-3xl font-semibold text-white">Projects</h1>
        <p className="text-md text-gray-100">
          Build fun and engaging projects while learning HTML, CSS, and
          JavaScript!
        </p>
        <CallToAction />
      </div>
    </div>
  );
}
