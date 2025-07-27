export const getStatusColor = (status: string) => {
  switch (status) {
    case "Watched":
      return "green";
    case "Currently Watching":
      return "orange";
    case "Want to Watch":
      return "blue";
    default:
      return "default";
  }
};

export const getTypeIcon = (type: string) => {
  return type === "Movie" ? "🎬" : "📺";
};

export const formatDuration = (minutes: number | null | undefined): string => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const formatBudget = (budget: number | null | undefined): string => {
  if (!budget) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget);
};
