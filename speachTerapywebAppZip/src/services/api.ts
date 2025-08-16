// API service functions for Right Choice Speech Therapy

const BASE_URL = 'https://strapi.hielav.com/api';

export interface ParentFeedback {
  id: number;
  documentId: string;
  ratingValue: number;
  message: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MonthlyImpactReport {
  id: number;
  documentId: string;
  childrenServed: string;
  successRate: string;
  newFamilies: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface UpcomingEvent {
  id: number;
  documentId: string;
  eventName: string;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RecentAchievement {
  id: number;
  documentId: string;
  achivement: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface EducationalArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  articleFullContent: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ResourceFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DownloadableResource {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  resourceFile: ResourceFile;
}

export interface FAQ {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AppointmentData {
  parentName: string;
  childsName: string;
  childsAge: string;
  preferedDate: string;
  preferedTime: string;
  contactNumber: string;
  email: string;
  additionalNotes: string;
}

// API Functions
export const fetchParentsFeedbacks = async (): Promise<ParentFeedback[]> => {
  try {
    const response = await fetch(`${BASE_URL}/parents-feed-backs`);
    if (!response.ok) throw new Error('Failed to fetch parent feedbacks');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching parent feedbacks:', error);
    return [];
  }
};

export const fetchMonthlyImpactReport = async (): Promise<MonthlyImpactReport | null> => {
  try {
    const response = await fetch(`${BASE_URL}/monthly-impact-reports`);
    if (!response.ok) throw new Error('Failed to fetch monthly impact report');
    const data = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching monthly impact report:', error);
    return null;
  }
};

export const fetchUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
  try {
    const response = await fetch(`${BASE_URL}/upcoming-events`);
    if (!response.ok) throw new Error('Failed to fetch upcoming events');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
};

export const fetchRecentAchievements = async (): Promise<RecentAchievement[]> => {
  try {
    const response = await fetch(`${BASE_URL}/recent-achievements`);
    if (!response.ok) throw new Error('Failed to fetch recent achievements');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching recent achievements:', error);
    return [];
  }
};

export const fetchEducationalArticles = async (): Promise<EducationalArticle[]> => {
  try {
    const response = await fetch(`${BASE_URL}/educational-articles`);
    if (!response.ok) throw new Error('Failed to fetch educational articles');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching educational articles:', error);
    return [];
  }
};

export const fetchDownloadableResources = async (): Promise<DownloadableResource[]> => {
  try {
    const response = await fetch(`${BASE_URL}/downloadable-resources?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch downloadable resources');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching downloadable resources:', error);
    return [];
  }
};

export const fetchFAQs = async (): Promise<FAQ[]> => {
  try {
    const response = await fetch(`${BASE_URL}/frequently-asked-questions`);
    if (!response.ok) throw new Error('Failed to fetch FAQs');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

export const submitAppointment = async (appointmentData: AppointmentData): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/parent-apointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: appointmentData
      }),
    });
    
    if (!response.ok) throw new Error('Failed to submit appointment');
    return true;
  } catch (error) {
    console.error('Error submitting appointment:', error);
    return false;
  }
};