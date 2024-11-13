export interface Trip {
  id?: string;
    title: string;
    status: string;
  startDate: Date | null;
  endDate: Date | null;
  peopleQuantity: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  memoryImages: string[];
    days: DayInfo[];
}


export interface DayInfo {
  day: number; 
  placesToVisit: string[]; 
  notes: string; 
}
