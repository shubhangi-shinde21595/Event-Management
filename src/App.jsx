import { useState } from "react";
import NewEvent from "./Componants/NewEvent.jsx";
import NoEventSelected from "./Componants/NoEventSelected.jsx";
import EventsSidebar from "./Componants/EventsSidebar.jsx";
import SelectedEvent from "./Componants/SelectedEvent.jsx";

function App() {
  const [eventsState, setEventsState] = useState({
    selectedEventId: undefined,
    events: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setEventsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        eventId: prevState.selectedEventId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(id) {
    setEventsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectEvent(id) {
    setEventsState((prevState) => {
      return {
        ...prevState,
        selectedEventId: id,
      };
    });
  }

  function handleStartAddEvent() {
    setEventsState((prevState) => {
      return {
        ...prevState,
        selectedEventId: null,
      };
    });
  }

  function handleCancelAddEvent() {
    setEventsState((prevState) => {
      return {
        ...prevState,
        selectedEventId: undefined,
      };
    });
  }

  function handleAddEvent(eventData) {
    setEventsState((prevState) => {
      const eventId = Math.random();
      const newEvent = {
        ...eventData,
        id: eventId,
      };
      return {
        ...prevState,
        selectedEventId: undefined,
        events: [...prevState.events, newEvent],
      };
    });
  }

  function handleDeleteEvent() {
    setEventsState((prevState) => {
      return {
        ...prevState,
        selectedEventId: undefined,
        events: prevState.events.filter(
          (event) => event.id !== prevState.selectedEventId
        ),
      };
    });
  }

  const selectedEvent = eventsState.events.find(
    (event) => event.id === eventsState.selectedEventId
  );

  let content = (
    <SelectedEvent
      event={selectedEvent}
      onDelete={handleDeleteEvent}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={eventsState.tasks}
    />
  );

  if (eventsState.selectedEventId === null) {
    content = (
      <NewEvent onAdd={handleAddEvent} onCancel={handleCancelAddEvent} />
    );
  } else if (eventsState.selectedEventId === undefined) {
    content = <NoEventSelected onStartAddEvent={handleStartAddEvent} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <EventsSidebar
        onStartAddEvent={handleStartAddEvent}
        events={eventsState.events}
        onSelectEvent={handleSelectEvent}
        selectedEventId={eventsState.selectedEventId}
      />
      {content}
    </main>
  );
}

export default App;
