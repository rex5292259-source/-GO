export type View = 'home' | 'ranking' | 'map' | 'orders' | 'profile' | 'stall-detail' | 'route-planning' | 'event-hub';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  badge?: 'Limited' | 'Hot' | 'New';
  vendors: string[]; // Store IDs
  featuredDishes: FoodItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  tags: string[];
  price?: number;
  calories?: string;
  allergens?: string[];
  location?: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  image: string;
  isNew?: boolean;
}
