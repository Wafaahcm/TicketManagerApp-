import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket-list', 
  templateUrl: './ticket-list.component.html', 
  styleUrls: ['./ticket-list.component.css'] 
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = []; // Array to hold the current list of tickets
  allTickets: Ticket[] = []; // Array to hold all tickets for filtering
  currentPage: number = 1; // Current page number for pagination
  pageSize: number = 100; // Number of tickets to display per page
  totalTickets: number = 0; // Total number of tickets available

  constructor(private ticketService: TicketService) { } // Inject the TicketService

  ngOnInit(): void {
    this.loadTickets(); // Load the tickets when the component initializes
  }

  // Function to load tickets from the server
  loadTickets(): void {
    this.ticketService.getTickets(undefined, undefined, undefined, this.currentPage, this.pageSize).subscribe(tickets => {
      this.tickets = tickets; // Set the current tickets
      this.allTickets = [...tickets];
      this.totalTickets = 100; // Update with the real total count
    });
  }

  // Function to delete a ticket by its ID
  deleteTicket(ticketId: number): void {
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      // Remove the deleted ticket from the current list
      this.tickets = this.tickets.filter(ticket => ticket.ticketId !== ticketId);
      this.loadTickets(); // Reload the tickets after deletion
    });
  }

  // Function to filter tickets based on a search query
  filterTickets(query: string): void {
    if (query) {
      // Filter tickets that include the search query in their description
      this.tickets = this.allTickets.filter(ticket =>
        ticket.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // If no query, show all tickets
      this.tickets = [...this.allTickets];
    }
  }

  // Function to sort tickets by a specific column and direction
  sortTickets(column: string, direction: string): void {
    const sortedTickets = [...this.tickets].sort((a, b) => {
      const aValue = (a as any)[column].toLowerCase(); // Get the value of the column for ticket a
      const bValue = (b as any)[column].toLowerCase(); // Get the value of the column for ticket b
      // Compare values and return sorting order based on direction
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1; // Ascending or descending order
      } else if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1; // Ascending or descending order
      } else {
        return 0; // Values are equal
      }
    });
    this.tickets = sortedTickets; // Update the tickets with the sorted array
  }

  // Function to go to the next page of tickets
  nextPage(): void {
    // Check if there are more tickets to load
    if (this.currentPage * this.pageSize < this.totalTickets) {
      this.currentPage++; // Move to the next page
      this.loadTickets(); // Load tickets for the new page
    }
  }

  // Function to go to the previous page of tickets
  prevPage(): void {
    // Check if we are not on the first page
    if (this.currentPage > 1) {
      this.currentPage--; // Move to the previous page
      this.loadTickets(); // Load tickets for the new page
    }
  }
}
