export type UserRole = 'SUPER_ADMIN' | 'DEPARTMENT_LEADER' | 'MEMBER';
export type Role = UserRole;

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    departmentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Department {
    id: string;
    name: string;
    description?: string;
    leaderId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type MeetingStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
export type FollowUpStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';

export interface Meeting {
    id: string;
    title: string;
    departmentId: string;
    date: string; // ISO string
    time: string;
    venue: string;
    meetingType: string;
    agenda: string;
    organizerId: string;
    followUpPersonId?: string;
    followUpDeadline?: string;
    followUpStatus: FollowUpStatus;
    meetingStatus: MeetingStatus;
}

export interface Budget {
    id: string;
    targetAmount: number;
    amountRaised: number;
    linkedEventId?: string;
    deadline: string;
    status: 'OPEN' | 'CLOSED';
}

export interface Contributor {
    id: string;
    name: string;
    amount: number;
    paymentMethod: string;
    date: string;
    budgetId: string;
    anonymousFlag: boolean;
}
