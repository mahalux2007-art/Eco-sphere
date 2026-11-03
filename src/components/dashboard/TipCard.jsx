import { Lightbulb } from 'lucide-react';

export default function TipCard({ tip }) {
  return (
    <div className="card bg-forest-700 p-5 text-white">
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb size={16} />
        <h3 className="text-sm font-semibold">Sustainability tip</h3>
      </div>
      <p className="text-sm leading-relaxed text-forest-50/90">{tip}</p>
    </div>
  );
}
