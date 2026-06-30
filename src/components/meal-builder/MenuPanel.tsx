import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories, categoryIcons, menuItems } from "@/lib/menu-data";
import { DraggableMenuItem } from "./DraggableMenuItem";

export function MenuPanel() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    "Top Sellers": true,
  });

  const grouped = useMemo(() => {
    const map: Record<string, typeof menuItems> = {};
    for (const c of categories) map[c] = menuItems.filter((m) => m.category === c);
    return map;
  }, []);

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5">
        <h2 className="text-lg font-bold text-foreground">Menu</h2>
        <p className="text-xs text-muted-foreground">Drag items to your tray →</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {categories.map((cat) => {
          const isOpen = open[cat] ?? false;
          return (
            <div key={cat} className="overflow-hidden rounded-xl bg-secondary/50">
              <button
                onClick={() => setOpen((s) => ({ ...s, [cat]: !isOpen }))}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <span className="text-lg">{categoryIcons[cat]}</span>
                <span className="min-w-0 flex-1 truncate">{cat}</span>
                <span className="text-xs text-muted-foreground">{grouped[cat].length}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-2 p-2">
                  {grouped[cat].map((item) => (
                    <DraggableMenuItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
