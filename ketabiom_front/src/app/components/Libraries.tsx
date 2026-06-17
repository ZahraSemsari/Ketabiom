import { useState } from "react";
import { Plus, X } from "lucide-react";
import React from "react";
const MAIN_LIBRARIES = ["خوانده شده", "در حال خواندن", "خواهم خواند"];

function LibraryBookGrid() {
  return (
    <div className="absolute inset-2 grid grid-cols-2 gap-1.5">
      <div className="bg-input-background border border-border rounded-xl" />
      <div className="bg-input-background border border-border rounded-xl" />
      <div className="bg-input-background border border-border rounded-xl" />
      <div className="bg-input-background border border-border rounded-xl" />
    </div>
  );
}

function LibraryCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative bg-accent rounded-lg w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 border border-border">
        <LibraryBookGrid />
      </div>
      <p className="mt-2 text-xs sm:text-sm md:text-base text-foreground text-center font-medium whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

function AddLibraryModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (name: string) => void;
}) {
  const [name, setName] = useState("");

  function handleSubmit() {
    if (!name.trim()) return;
    onAdd(name.trim());
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative bg-card border-4 border-primary rounded-[29px] w-full max-w-sm p-6 sm:p-8"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center justify-start gap-2 mb-6">
          <p className="text-lg sm:text-xl font-medium text-foreground">
            کتابخانه جدید
          </p>
        </div>

        <p className="text-center mb-3 text-foreground">
          عنوان کتابخانه را وارد کنید:
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-input-background border border-border rounded-xl h-14 px-4 text-right text-foreground outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl h-10 font-medium"
        >
          افزودن کتابخانه
        </button>
      </div>
    </div>
  );
}

export default function Libraries() {
  const [modalOpen, setModalOpen] = useState(false);
  const [extraLibraries, setExtraLibraries] = useState<string[]>([]);

  function handleAddLibrary(name: string) {
    setExtraLibraries((prev) => [...prev, name]);
  }

  const allLibraries = [...MAIN_LIBRARIES, ...extraLibraries];

  return (
    <div className="py-5 sm:py-6">
      <p className="text-right font-bold text-base sm:text-lg mb-4 text-foreground">
        کتابخانه
      </p>

      <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-2">
        {allLibraries.map((lib) => (
          <LibraryCard key={lib} name={lib} />
        ))}

        {/* Add button */}
        <div className="flex flex-col items-center justify-center shrink-0 pt-1">
          <button
            onClick={() => setModalOpen(true)}
            className="w-12 h-12 flex items-center justify-center bg-accent text-foreground hover:bg-muted rounded-xl transition-colors border border-border"
          >
            <Plus size={28} />
          </button>
          <p className="text-xs mt-2 text-foreground">افزودن کتابخانه</p>
        </div>
      </div>

      {modalOpen && (
        <AddLibraryModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAddLibrary}
        />
      )}
    </div>
  );
}
