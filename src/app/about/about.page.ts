import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Training } from '../../models/training';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  title:string = 'Tips';

  pageItems:Array<Training> = [];
  items:Array<Training>;
  searchTerm:string;
  searching:boolean = false;
  searchControl:FormControl;
  searchInput:FormControl;

  constructor() {
    
    this.items = [
      {title: "toilet training",
       word: "use multiple pee pads in the house. give them treats, and let them play around it.",
       img: "../assets/toiletTraining.png"},

       {title: "biting",
       word: "hide your hands behind your back If they don't stop, stand up and look away. If they still don't stop, go to your room, close the door and come out after 1 minute. REPEAT",
       img: "../assets/bite.png"},

       {title: "sit",
       word: "place the treat about their heads. They will look up and as soon as they sit down, give them the treat. REPEAT",
       img: "../assets/sit.png"},

       {title: "barking",
       word: "When barking, block your dog with your legs but do not face them. face where the dog is barking at and push them with your legs. You can also get vibrating collar for barking or anti-barking spray but it is best to teach them to not bark without any tools.",
       img: "../assets/bark.png"},

       {title: "socialise",
       word: "Socialising your dog with other people and dogs is important. Bring them to the park as often as you can, invite your friends to your place since they are young. You can also go to puppy school for socialising.",
       img: "../assets/socialise.png"},

       {title: "shower",
       word: "First of all, do not wash them too often. Use dog shampoo only. If they are scared of showering, give them treats while bathing them. Make it quick and easy. Don't forget to FULLY dry them after shower to prevent skin issues.",
       img: "../assets/shower.png"}
    ];
    this.searchInput = new FormControl();
    this.items.forEach( (item) => {
      this.pageItems.push(item);
    });
  }


  ngOnInit() {
    this.searchInput.valueChanges.subscribe( (search) => {
      console.log(search);
      this.searching = false;
        this.searchTerm = search;
        this.filterItems( search );
    });
  }

  filterItems( searchTerm ){
    this.searching = true;
    if( searchTerm.length > 0 ){
      this.pageItems.forEach( (pageItem, index) => {
        if( pageItem.title.indexOf( searchTerm ) == -1 ){
          this.pageItems.splice(index,1);
        }
      });
    }
    else{
      this.searching = false;
      console.log(this.items);
      this.restoreList();
    }
  }
  cancelSearch(){
    this.searching = false;
  }
  restoreList(){
    console.log(this.items);
    this.pageItems = [];
    this.items.forEach( (item) => {
      this.pageItems.push(item);
    });
  }




}

