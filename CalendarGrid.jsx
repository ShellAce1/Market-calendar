import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

const allEvents = [
  { date: "2025-06-20", title: "FOMC Rate Decision", description: "🏛 Central Bank" },
  { date: "2025-06-21", title: "U.S. Initial Jobless Claims", description: "💼 Jobs / Employment" },
  { date: "2025-06-22", title: "Crypto Regulation Bill Vote", description: "🪙 Crypto" },
  { date: "2025-07-15", title: "CPI Data Release", description: "📊 Inflation / CPI" },
  { date: "2025-08-01", title: "Earnings Season Q2 Wrap-Up", description: "💰 Earnings" },
  { date: "2025-09-02", title: "U.S. Labor Day", description: "🇺🇸 US Holidays" },
  { date: "2025-10-03", title: "Middle East Summit", description: "🪖 Geopolitical / Conflict" },
  { date: "2025-12-19", title: "ECB Policy Meeting", description: "🌍 Global Macro" }
];

const filters = {
  "🏛": "Central Bank",
  "📊": "Inflation / CPI",
  "💼": "Jobs / Employment",
  "🪙": "Crypto",
  "🌍": "Global Macro",
  "🇺🇸": "US Holidays",
  "💰": "Earnings",
  "🪖": "Geopolitical / Conflict"
};
