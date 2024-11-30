export interface Event {
  id: string;
  title: string;
  description: string;
}
export interface Period {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  events: Event[];
}

export type TimelineData = Period[];
