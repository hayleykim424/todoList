import { Component, OnInit } from '@angular/core';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  title:string = 'Train your pet!';

  constructor(
    //private youtube: YoutubeVideoPlayer
  ) 
  {
    //this.youtube.openVideo('myvideoid');
  }


  ngOnInit() {
  }

}
