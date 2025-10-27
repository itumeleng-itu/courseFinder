/**
 * Service to fetch South African examination dates
 */

export interface ExamEvent {
  id: string;
  subject: string;
  date: Date;
  paperNumber?: number;
  startTime?: string;
  endTime?: string;
}

/**
 * Fetches South African National Senior Certificate (NSC) examination dates
 * This uses the Department of Basic Education API (simulated for now)
 */
export async function fetchExamDates(): Promise<ExamEvent[]> {
  try {
    // In a real implementation, this would fetch from an actual API
    // For now, we'll simulate a response with the 2024 NSC exam timetable
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data based on typical NSC exam schedule
    return getMockExamDates();
  } catch (error) {
    console.error('Error fetching exam dates:', error);
    return getMockExamDates(); // Fallback to mock data
  }
}

/**
 * Mock exam dates based on typical NSC exam schedule
 */
function getMockExamDates(): ExamEvent[] {
  const currentYear = new Date().getFullYear();
  
  return [
    { 
      id: '1', 
      subject: 'English Home Language Paper 1',
      date: new Date(currentYear, 9, 21), // October 21
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '2', 
      subject: 'Mathematics Paper 1',
      date: new Date(currentYear, 9, 24), // October 24
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '3', 
      subject: 'Physical Sciences Paper 1',
      date: new Date(currentYear, 9, 28), // October 28
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '4', 
      subject: 'Life Sciences Paper 1',
      date: new Date(currentYear, 10, 1), // November 1
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '5', 
      subject: 'Mathematics Paper 2',
      date: new Date(currentYear, 10, 4), // November 4
      paperNumber: 2,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '6', 
      subject: 'Physical Sciences Paper 2',
      date: new Date(currentYear, 10, 7), // November 7
      paperNumber: 2,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '7', 
      subject: 'Life Sciences Paper 2',
      date: new Date(currentYear, 10, 11), // November 11
      paperNumber: 2,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '8', 
      subject: 'Geography Paper 1',
      date: new Date(currentYear, 10, 14), // November 14
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '9', 
      subject: 'Geography Paper 2',
      date: new Date(currentYear, 10, 18), // November 18
      paperNumber: 2,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '10', 
      subject: 'History Paper 1',
      date: new Date(currentYear, 10, 21), // November 21
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '11', 
      subject: 'History Paper 2',
      date: new Date(currentYear, 10, 25), // November 25
      paperNumber: 2,
      startTime: '09:00',
      endTime: '12:00'
    },
    { 
      id: '12', 
      subject: 'Accounting',
      date: new Date(currentYear, 10, 28), // November 28
      paperNumber: 1,
      startTime: '09:00',
      endTime: '12:00'
    }
  ];
}