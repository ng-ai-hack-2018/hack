import { Component, OnInit } from '@angular/core';
import { FaceDataService } from '../cognitive-services/face-data.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  private happiness: number = 0.5;
  private sadness: number = 0.5;
  private anger: number = 0.5;
  private contempt: number = 0.5;
  private neutral: number = 0.5;
  private surprise: number = 0.5;
  private fear: number = 0.5;
  private disgust: number = 0.5;

  constructor(private faceDataService: FaceDataService) { }

  ngOnInit() {
  }

    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;

    }

  ngAfterViewInit () {
    const player: any = document.getElementById('player');

    const handleSuccess = function(stream) {
      player.srcObject = stream;
        console.log(stream);
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(handleSuccess)
    setInterval(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        //draw image to canvas. scale to target dimensions
        ctx.drawImage(player, 0, 0, canvas.width, canvas.height);

        //convert to desired file format
        const dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
        this.faceDataService.detectEmotion(this.dataURItoBlob(dataURI))
            .then(faces => {
                console.log(faces);
                const emotion = faces.map(face => {
                    return face.faceAttributes.emotion;
                })
                .reduce((agg, e) => {
                    agg.anger += e.anger;
                    agg.contempt += e.contempt;
                    agg.happiness += e.happiness;
                    agg.neutral += e.neutral;
                    agg.disgust += e.disgust;
                    agg.fear += e.fear;
                    agg.sadness += e.sadness;
                    agg.surprise += e.surprise;
                    return agg;
                }, {anger: 0, contempt: 0, happiness: 0, neutral: 0, disgust: 0, fear: 0, sadness: 0, surprise: 0});
                console.log(emotion, faces.length);
                this.anger = emotion.anger / faces.length;
                this.contempt = emotion.contempt / faces.length;
                this.happiness = emotion.happiness / faces.length;
                this.neutral = emotion.neutral / faces.length;
                this.disgust = emotion.disgust / faces.length;
                this.fear = emotion.fear / faces.length;
                this.sadness = emotion.sadness / faces.length;
                this.surprise = emotion.surprise / faces.length;
            })
            .catch((error) => {
                console.log('oh no', error);
            });
    }, 3000);
  }
}
