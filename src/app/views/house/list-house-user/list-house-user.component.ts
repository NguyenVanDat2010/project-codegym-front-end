import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';

@Component({
  selector: 'app-list-house-user',
  templateUrl: './list-house-user.component.html',
  styleUrls: ['./list-house-user.component.css'],
})
export class ListHouseUserComponent implements OnInit {
  username = this.activateRoute.snapshot.params.username;
  houses: HouseResponse[];
  postLength: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.getAllHouseByUsename();
  }

  getAllHouseByUsename() {
    this.houseService.getAllHouseByUser(this.username).subscribe((data) => {
      this.houses = data;
      this.postLength = data.length;
      // console.log(data);
    });
  }
}
