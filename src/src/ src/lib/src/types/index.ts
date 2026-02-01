export interface UserProfile {
  id: string;
  display_name: string;
  email?: string | null;
  password_hash?: string | null;
  phone_number?: string | null;
  current_streak: number;
  longest_streak: number;
  total_activities_completed: number;
  last_activity_date: string | null;
  birthdate?: string | null;
  gender?: string | null;
  is_setup_complete: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'writing' | 'learning' | 'mindfulness';
  subcategory?: string;
  icon?: string;
  content: Record<string, unknown>;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export interface UserCompletion {
  id: string;
  user_id: string;
  activity_id: string;
  response?: string;
  completed_at: string;
  completion_date: string;
}

export type CategoryType = 'learning' | 'writing' | 'mindfulness';

export interface CategoryInfo {
  type: CategoryType;
  title: string;
  color: string;
  bgColor: string;
  icon: string;
}
