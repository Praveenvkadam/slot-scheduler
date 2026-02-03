import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------- API ---------- */

async function fetchBatches(month, year) {
  const res = await fetch(`/api/batches?month=${month}&year=${year}`);
  if (!res.ok) throw new Error("Failed to fetch batches");
  return res.json();
}

async function createBatch(batch) {
  const res = await fetch("/api/batches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batch),
  });

  if (!res.ok) throw new Error("Failed to create batch");
  return res.json();
}

/* ---------- HOOKS ---------- */

export function useBatches(month, year) {
  return useQuery({
    queryKey: ["batches", year, month],
    queryFn: () => fetchBatches(month, year),
  });
}

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      alert("You created a batch.");
    },
  });
}
