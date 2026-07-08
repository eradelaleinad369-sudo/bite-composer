import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type RepublicDataRow } from "@/lib/supabase";

export const Route = createFileRoute("/republic-data")({
  head: () => ({
    meta: [{ title: "Republic Data · Supabase Test" }],
  }),
  component: RepublicDataPage,
});

function RepublicDataPage() {
  const [rows, setRows] = useState<RepublicDataRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("Republic_Data")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRows((data ?? []) as RepublicDataRow[]);
      });
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-extrabold text-foreground">Republic_Data</h1>
      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          Error: {error}
        </div>
      )}
      {!rows && !error && <p className="text-muted-foreground">Loading…</p>}
      {rows && rows.length === 0 && <p className="text-muted-foreground">No rows found.</p>}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="px-3 py-2">id</th>
                <th className="px-3 py-2">created_at</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="border-t border-border">
                  <td className="px-3 py-2">{String(r.id)}</td>
                  <td className="px-3 py-2">{r.created_at}</td>
                  <td className="px-3 py-2">{r.Name}</td>
                  <td className="px-3 py-2">{r.Order}</td>
                  <td className="px-3 py-2">{r.Amount}</td>
                  <td className="px-3 py-2">{r.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
