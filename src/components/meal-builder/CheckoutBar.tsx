import { useState } from "react";
import { useCart, cartTotal } from "@/lib/cart-store";
import { CheckoutModal } from "./CheckoutModal";
import { formatNaira } from "@/lib/menu-data";

export function CheckoutBar() {
  const name = useCart((s) => s.name);
  const setName = useCart((s) => s.setName);
  const entries = useCart((s) => s.entries);
  const [open, setOpen] = useState(false);
  const total = cartTotal(entries);
  const canCheckout = entries.length > 0 && name.trim().length > 0;

  return (
    <>
      <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name Here"
            className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            disabled={!canCheckout}
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-xl bg-primary px-8 py-3 text-sm font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            Checkout {entries.length > 0 && `· ${formatNaira(total)}`}
          </button>
        </div>
      </div>
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
