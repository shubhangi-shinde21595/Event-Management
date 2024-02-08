import Button from "./Button.jsx";

export default function EventsSidebar({
  onStartAddEvent,
  events,
  onSelectEvent,
  selectedEventId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Events
      </h2>
      <div>
        <Button onClick={onStartAddEvent}> + Add Event </Button>
      </div>
      <ul className="mt-8">
        {events.map((event) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded my-1  hover:text-stone-200 hover:bg-stone-800";

          if (event.id === selectedEventId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={event.id}>
              <button
                onClick={() => onSelectEvent(event.id)}
                className={cssClasses}
              >
                {event.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
