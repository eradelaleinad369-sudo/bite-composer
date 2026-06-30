import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { MenuPanel } from "./MenuPanel";
import { DropZone, ITEM_SIZE } from "./DropZone";
import { CheckoutBar } from "./CheckoutBar";
import { useCart } from "@/lib/cart-store";
import type { MenuItem } from "@/lib/menu-data";
import { formatNaira } from "@/lib/menu-data";

export function MealBuilder() {
  const add = useCart((s) => s.add);
  const move = useCart((s) => s.move);
  const entries = useCart((s) => s.entries);
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
    const kind = e.active.data.current?.kind;
    const overRect = e.over?.rect;

    // Repositioning an existing tray item
    if (typeof e.active.id === "string" && e.active.id.startsWith("tray-")) {
      const uid = e.active.data.current?.uid as string | undefined;
      if (!uid) return;
      const entry = entries.find((x) => x.uid === uid);
      if (!entry) return;
      const newX = entry.x + e.delta.x;
      const newY = entry.y + e.delta.y;
      if (overRect) {
        const maxX = overRect.width - ITEM_SIZE - 8;
        const maxY = overRect.height - ITEM_SIZE - 8;
        move(uid, Math.max(8, Math.min(newX, maxX)), Math.max(8, Math.min(newY, maxY)));
      } else {
        move(uid, newX, newY);
      }
      return;
    }

    // New item dropped from the menu
    if (kind !== "tray" && e.over?.id === "meal-tray") {
      const item = e.active.data.current?.item as MenuItem | undefined;
      if (!item || !overRect) return;
      const activeRect = e.active.rect.current.translated;
      if (!activeRect) return;
      const cx = activeRect.left + activeRect.width / 2;
      const cy = activeRect.top + activeRect.height / 2;
      let x = cx - overRect.left - ITEM_SIZE / 2;
      let y = cy - overRect.top - ITEM_SIZE / 2;
      const maxX = overRect.width - ITEM_SIZE - 8;
      const maxY = overRect.height - ITEM_SIZE - 8;
      x = Math.max(8, Math.min(x, maxX));
      y = Math.max(8, Math.min(y, maxY));
      add(item, x, y);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onStart}
      onDragEnd={onEnd}
      onDragCancel={() => setActive(null)}
    >
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl text-primary-foreground shadow-md shadow-primary/30">
                🍗
              </div>
              <div>
                <h1 className="text-lg font-extrabold leading-tight text-foreground">
                  Chicken Republic
                </h1>
                <p className="text-xs text-muted-foreground">Build your own meal</p>
              </div>
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              Drag · Drop · Arrange · Devour
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
          <div className="grid h-[72px] w-[72px] cursor-grabbing place-items-center rounded-2xl bg-white text-4xl shadow-2xl ring-1 ring-black/10">
            <span>{active.emoji}</span>
            <span className="sr-only">
              {active.name} {formatNaira(active.price)}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
