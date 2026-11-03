import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function ImageUpload({ label = 'Photo (optional)', value, onChange, hint }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <span className="label">{label}</span>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Upload preview" className="h-32 w-32 rounded-xl object-cover border border-forest-100" />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            aria-label="Remove photo"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-muted shadow-card border border-forest-100 hover:text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-forest-200 text-muted hover:border-forest-400 hover:text-forest-600 hover:bg-forest-50 transition-colors"
        >
          <ImagePlus size={22} />
          <span className="text-xs font-medium">Add photo</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
