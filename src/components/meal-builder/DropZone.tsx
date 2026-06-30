import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart, cartTotal } from "@/lib/cart-store";
import { formatNaira } from "@/lib/menu-data";

const MIN_ORDER = 3000;
const EXTRA_FEE = 400;

export function DropZone() {
  const { isOver, setNodeRef } = useDroppable({ id: "meal-tray" });
  const entries = useCart((s) => s.entries);
  const remove = useCart((s) => s.remove);
  const total = cartTotal(entries);
  const remaining = Math.max(0, MIN_ORDER - total);

  return (
    <div className="flex h-full flex-col gap-4">
      <div
        ref={setNodeRef}
        className={`relative flex-1 overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
          isOver
            ? "border-primary bg-primary/10 shadow-[0_0_0_6px_var(--color-primary)/10]"
            : "border-border bg-secondary/30"
        }`}
      >
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground shadow">
          <ShoppingBag className="h-3.5 w-3.5 text-primary" />
          Items: <span className="text-primary">{entries.length}</span>
        </div>

        {entries.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={isOver ? { scale: 1.1 } : { scale: 1 }}
              className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-4xl"
            >
              🍽️
            </motion.div>
            <p className="text-xl font-bold uppercase tracking-wider text-muted-foreground">
              Drag and drop here...
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Build your perfect meal by dragging items from the menu
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6 pt-14">
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {entries.map((e) => (
                  <motion.div
                    key={e.uid}
                    initial={{ opacity: 0, scale: 0.7, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group flex items-center gap-2 rounded-full border border-primary/30 bg-card py-1.5 pl-3 pr-1.5 shadow-sm"
                  >
                    <span className="text-lg">{e.item.emoji}</span>
                    <span className="text-sm font-semibold text-foreground">{e.item.name}</span>
                    <span className="text-xs font-medium text-primary">
                      {formatNaira(e.item.price)}
                    </span>
                    <button
                      onClick={() => remove(e.uid)}
                      className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-muted-foreground transition hover:bg-destructive hover:text-destructive-foreground"
                      aria-label="Remove"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total</span>
          <motion.span
            key={total}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className="text-2xl font-extrabold text-foreground"
          >
            {formatNaira(total)}
          </motion.span>
        </div>
        {remaining > 0 && entries.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Reach <span className="font-semibold text-foreground">{formatNaira(MIN_ORDER)}</span> to
            avoid extra fee of{" "}
            <span className="font-semibold text-destructive">{formatNaira(EXTRA_FEE)}</span>
            {" — "}
            <span className="text-primary">{formatNaira(remaining)} to go</span>
          </p>
        )}
      </div>
    </div>
  );
}
