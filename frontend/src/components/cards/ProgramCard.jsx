const colorMap = {
  indigo: "border-indigo bg-indigo/5 text-indigo",
  sage: "border-sage bg-sage/5 text-sage-dark",
  marigold: "border-marigold bg-marigold/10 text-marigold-dark",
};

export default function ProgramCard({ program }) {
  const cls = colorMap[program.color] || colorMap.indigo;
  return (
    <div className={`border-2 rounded-sm p-6 flex flex-col h-full ${cls}`}>
      {program.image_url && (
        <img
          src={program.image_url}
          alt={program.title}
          className="mb-3 rounded-sm aspect-[16/9] w-full object-cover"
        />
      )}
      <h3 className="font-display text-xl font-semibold text-indigo-deep">{program.title}</h3>
      <p className="mt-3 text-ink/75 leading-relaxed flex-1">{program.summary}</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-wide">{program.impact}</p>
    </div>
  );
}
