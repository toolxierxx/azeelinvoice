'use client';
import React from 'react';
import { Layers } from 'lucide-react';

const templates = [
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'dark', label: 'Dark' },
  { id: 'creative', label: 'Creative' },
];

export default function TemplateSelector({ active, onSelect }: { active: string; onSelect: (t: string) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-500 mr-1">
        <Layers size={13} />
        Template:
      </div>
      {templates.map((tpl) => (
        <button
          key={`tplsel-${tpl.id}`}
          onClick={() => onSelect(tpl.id)}
          className={`px-3 py-1 rounded-lg text-xs font-600 transition-all ${
            active === tpl.id
              ? 'bg-primary text-white shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {tpl.label}
        </button>
      ))}
    </div>
  );
}