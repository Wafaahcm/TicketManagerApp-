import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This service is responsible for handling ticket-related operations
@Injectable({
  providedIn: 'root' 
})
export class TicketService {

  private apiUrl = "https://localhost:7002"; // Base URL for the API

  private tickets: Ticket[] = []; // Array to store tickets

  constructor(private http: HttpClient) {} // Inject HttpClient for making HTTP requests

  // Get a list of tickets with optional filters for search, sorting, and pagination
  getTickets(query?: string, sortBy?: string, sortDirection?: string, pageNumber: number = 1, pageSize: number = 10): Observable<Ticket[]> {
    let url = `${this.apiUrl}/api/Tickets?pageNumber=${pageNumber}&pageSize=${pageSize}`; // Base URL with pagination
    const params = []; // Array to hold query parameters
  
    // If there is a search query, add it to the parameters
    if (query) {
      params.push(`search=${query}`);
    }
    // If there is a field to sort by, add it to the parameters
    if (sortBy) {
      params.push(`sortBy=${sortBy}`);
    }
    // If there is a sorting direction, add it to the parameters
    if (sortDirection) {
      params.push(`sortDirection=${sortDirection}`);
    }
  
    // If there are any parameters, append them to the URL
    if (params.length > 0) {
      url += '&' + params.join('&'); // Join parameters with '&'
    }
  
    return this.http.get<Ticket[]>(url); // Make a GET request and return an Observable of tickets
  }
  
  // Retrieve a specific ticket by its ID
  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/api/Tickets/${id}`); // Make a GET request for the ticket
  }

  // Add a new ticket
  addTicket(ticket: Ticket): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/Tickets/`, ticket); // Make a POST request to add the ticket
  }

  // Delete a ticket by its ID
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/Tickets/${id}`); // Make a DELETE request to remove the ticket
  }

  // Update an existing ticket
  updateTicket(id: number, updatedTicket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/Tickets/${id}`, updatedTicket); // Make a PUT request to update the ticket
  }
}
