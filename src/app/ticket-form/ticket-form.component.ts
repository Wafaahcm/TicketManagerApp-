import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../models/ticket';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-form', 
  templateUrl: './ticket-form.component.html', 
  styleUrls: ['./ticket-form.component.css'] 
})

export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup = new FormGroup({}); // Form group to manage the ticket form
  isEditMode: boolean = false; // this indicate if we are in edit mode

  constructor(
    private formBuilder: FormBuilder, // Used to build the form
    private ticketService: TicketService, // Service to manage tickets
    private router: Router, // Router to navigate between pages
    private activatedRoute: ActivatedRoute // Route to access route parameters
  ) {}

  ngOnInit(): void {
    // Initialize the form with required fields
    this.ticketForm = this.formBuilder.group({
      ticketId: ['', Validators.required], // Ticket ID is required
      description: ['', Validators.required], // Description is required
      status: ['', Validators.required], // Status is required
      date: ['', Validators.required], // Date is required
    });

    // Get the ticket ID from the URL parameters
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // If an ID is present, we are in edit mode
    if (id) {
      this.isEditMode = true; // Set edit mode to true
      // Fetch the ticket data from the server
      this.ticketService.getTicket(Number(id)).subscribe(ticket => {
        if (ticket) {
          this.ticketForm.patchValue(ticket); // Fill the form with ticket data
        }
      });
    }
  }

  // Function called when the form is submitted
  onSubmit(): void {
    if (this.ticketForm.valid) { // Check if the form is valid
      let ticket: Ticket = this.ticketForm.value; // Get the ticket data from the form

      let id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the ticket ID again

      if (id) {
        // If ID exists, update the ticket
        this.ticketService.updateTicket(Number(id), ticket).subscribe(() => {
          console.log("Update request processed"); // Log when update is done
        });  
      } else {
        // If no ID, add a new ticket
        this.ticketService.addTicket(ticket).subscribe(() => {
          console.log("Add request processed"); // Log when add is done
        });
      }

      // Navigate back to the list of tickets
      this.router.navigate(['/list']);
    }
  }
}
