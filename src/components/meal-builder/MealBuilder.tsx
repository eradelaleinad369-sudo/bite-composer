import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { MenuPanel } from "./MenuPanel";
import { DropZone } from "./DropZone";
import { CheckoutBar } from "./CheckoutBar";
import { useCart } from "@/lib/cart-store";
import type { MenuItem } from "@/lib/menu-data";
import { formatNaira } from "@/lib/menu-data";

export function MealBuilder() {
  const add = useCart((s) => s.add);
  const [active, setActive] = useState<MenuItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  const onStart = (e: DragStartEvent) => {
    const item = e.active.data.current?.item as MenuItem | undefined;
    if (item) setActive(item);
  };

  const onEnd = (e: DragEndEvent) => {
    setActive(null);
    if (e.over?.id === "meal-tray") {
      const item = e.active.data.current?.item as MenuItem | undefined;
      if (item) add(item);
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={onStart} onDragEnd={onEnd} onDragCancel={() => setActive(null)}>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl text-primary-foreground shadow-md shadow-primary/30">
                🍗
              </div>
              <div>
                <h1 className="text-lg font-extrabold leading-tight text-foreground">Chicken Republic</h1>
                <p className="text-xs text-muted-foreground">Build your own meal</p>
              </div>
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              Drag · Drop · Devour
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
          <div className="grid h-[calc(100vh-220px)] min-h-[560px] grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,30%)_1fr]">
            <MenuPanel />
            <DropZone />
          </div>
        </main>

        <CheckoutBar />
      </div>

      <DragOverlay dropAnimation={null}>
        {active && (
          <div className="flex cursor-grabbing items-center gap-3 rounded-xl border border-primary bg-card p-3 shadow-2xl shadow-primary/30">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-2xl">
              {active.emoji}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{active.name}</p>
              <p className="text-xs font-medium text-primary">{formatNaira(active.price)}</p>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
