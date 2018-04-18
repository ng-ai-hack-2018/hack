import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    ngAfterViewInit () {
        const player: any = document.getElementById('player');

        const handleSuccess = function(stream) {
            player.srcObject = stream;
        };

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(handleSuccess)
    }
}
