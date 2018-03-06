import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      // console.log(this.client);
    });
  }

  updateBalance(id:string) {
    // Update Client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated', {
      cssClass:'alert-success',
      timeout: 4000
    });
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick() {
    if(confirm("Are you sure you want to delete " + this.client.firstName + " " + this.client.lastName + "?")){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client removed', {
        cssClass:'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
