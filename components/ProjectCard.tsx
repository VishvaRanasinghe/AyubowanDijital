"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project: p }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasValidImage = p.image_url && (p.image_url.includes('supabase.co') || p.image_url.startsWith('/'));

  return (
    <>
      <div className="rounded-xl border border-line bg-panel p-5 transition hover:border-signal/60 flex flex-col h-full">
        {hasValidImage && (
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="relative mb-4 h-48 w-full shrink-0 overflow-hidden rounded-lg bg-ink/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright group cursor-zoom-in"
            aria-label={`View full image for ${p.title}`}
          >
            <Image 
              src={p.image_url!} 
              alt={p.title} 
              fill 
              className="object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </button>
        )}
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs uppercase tracking-wide text-signal font-semibold">
            {p.category}
          </p>
          <h3 className="mt-2 font-display font-semibold text-lg">{p.title}</h3>
          <p className="mt-2 text-sm text-mist leading-relaxed flex-grow">{p.description}</p>
          
          {p.link && (
            <a 
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-signalBright hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded self-start"
            >
              Visit Project &rarr;
            </a>
          )}
        </div>
      </div>

      {isModalOpen && hasValidImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-5xl">
            <Image 
              src={p.image_url!} 
              alt={p.title} 
              fill 
              className="object-contain" 
            />
            <button 
              type="button"
              className="absolute -top-10 right-0 text-mist hover:text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close (X)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
