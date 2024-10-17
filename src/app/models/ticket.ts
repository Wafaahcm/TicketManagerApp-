export interface Ticket {
  ticketId: number;
  description: string;
  status: 'Open' | 'Closed';
  date: Date;
}
