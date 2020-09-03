import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/containers/model/reservation/reservation';

@Component({
  selector: 'app-list-reservation-user',
  templateUrl: './list-reservation-user.component.html',
  styleUrls: ['./list-reservation-user.component.css']
})
export class ListReservationUserComponent implements OnInit {
  reservationByUser: Array<Reservation>;
  username = this.activateRouter.snapshot.paramMap.get('username');


  constructor(private reservationService: ReservationService,
              private route: Router,
              private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllReservationByUsername();
  }

  getAllReservationByUsername(){
    this.reservationService.getAllReservationByUsername(this.username).subscribe((res)=>{
      this.reservationByUser = res;
      // console.log(res);
    },
    (rej)=>{

    })
  }

  deleteReservationById(id:number){
    if(confirm('Are you sure?')) {
      this.reservationService.deleteReservationById(id).subscribe(res =>{
        this.getAllReservationByUsername();
        // console.log(res);
      })
    }
  }

}