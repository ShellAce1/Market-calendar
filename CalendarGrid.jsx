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
function LiveNewsFeed() {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?q=stock%20OR%20crypto%20OR%20federal%20reserve&language=en&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`);
        const data = await response.json();
        if (data.articles) {
          setHeadlines(data.articles.slice(0, 6).map((article) => ({
            title: article.title,
            url: article.url
          })));
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-2xl mb-8">
      <h2 className="text-lg font-bold mb-2">📰 Latest Market Headlines</h2>
      <ul className="space-y-1 text-sm list-disc list-inside">
        {headlines.length > 0 ? (
          headlines.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {item.title}
              </a>
            </li>
          ))
        ) : (
          <li className="text-gray-500">Loading news...</li>
        )}
      </ul>
    </div>
  );
}
export default function CalendarGrid() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilters, setActiveFilters] = useState(Object.keys(filters));

  const months = ["June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function generateDays(monthIndex, year = 2025) {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysArray = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const currentDate = new Date(year, monthIndex, d);
      const iso = format(currentDate, "yyyy-MM-dd");
      const event = allEvents.find((e) => e.date === iso && activeFilters.some(f => e.description.includes(f)));
      daysArray.push({ date: iso, day: d, event });
    }

    return daysArray;
  }

  function toggleFilter(symbol) {
    setActiveFilters(prev =>
      prev.includes(symbol) ? prev.filter(f => f !== symbol) : [...prev, symbol]
    );
  }
  return (
    <div className="p-4 space-y-10">
      <LiveNewsFeed />

      <div className="sticky top-0 z-10 bg-white pb-4">
        <h1 className="text-xl font-bold mb-2">📅 Event Filters</h1>
        <div className="flex flex-wrap gap-4">
          {Object.entries(filters).map(([symbol, label]) => (
            <label key={symbol} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={activeFilters.includes(symbol)} onCheckedChange={() => toggleFilter(symbol)} />
              <span>{symbol} {label}</span>
            </label>
          ))}
        </div>
      </div>
      {[2025, 2026].map((year) => (
        months.map((month, idx) => (
          <div key={`${month}-${year}`} className="space-y-4">
            <h2 className="text-2xl font-bold">{month} {year}</h2>
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((d) => (
                <div key={d} className="font-medium text-sm text-muted-foreground">{d}</div>
              ))}
              {generateDays(idx + 5, year).map((dayObj, i) => (
                <div key={i} className="aspect-square">
                  {dayObj ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card
                          onClick={() => setSelectedEvent(dayObj.event)}
                          className={`h-full w-full p-1 rounded-2xl cursor-pointer text-sm flex flex-col items-start justify-start ${dayObj.event ? "bg-blue-100 hover:bg-blue-200" : "bg-white"}`}
                        >
                          <CardContent className="h-full w-full p-1">
                            <div className="font-bold text-sm">{dayObj.day}</div>
                            {dayObj.event && (
                              <div className="text-xs text-left mt-1">{dayObj.event.description} {dayObj.event.title}</div>
                            )}
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      {dayObj.event && (
                        <DialogContent>
                          <DialogTitle>{dayObj.event.title}</DialogTitle>
                          <p className="text-sm mt-2 mb-4">{dayObj.event.description}</p>
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(dayObj.event.title + ' ' + dayObj.event.date)}&tbm=nws`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            🔗 View Related News
                          </a>
                        </DialogContent>
                      )}
                    </Dialog>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ))}
    </div>
  );
}
