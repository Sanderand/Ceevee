import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs';

import { CV } from './cv.model';

@Injectable()
export class DataService {
  public getData (): Observable<CV> {
    return Observable.of(data);
  }

  // constructor (
  //   private _http: Http
  // ) {}
  //
  // public getData (): Observable<CV> {
  //   return Observable.of(data);
  //   return this._http
  //     .get(DATA_PATH)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  //
  // private extractData (res: Response): any {
  //   let body = res.json();
  //   console.log(body.data);
  //   return body.data || {};
  // }
  //
  // private handleError (error: Response | any): any {
  //   console.error(error);
  //   return Observable.throw(error);
  // }
}

const data = {
  "details": {
    "name": "Andre Sander",
    "dob": 12836127832,
    "email": "mail@andresander.com",
    "url": "http://andresander.com",
    "tel": "+64 22 348 1354",
    "summary": "Lorem ipsum dolor sit amet"
  },
  "theme": {
    "name": "Default",
    "class": "default"
  },
  "items": [{
    "class": "header",
    "headline": "Curriculum Vitae",
    "subline": "Lebenslauf"
  },{
    "class": "experience",
    "headline": "Experience",
    "subline": "Jobs",
    "items": [{
      "headline": "Front End Developer",
      "subline": "Contractor",
      "institution": "IE Digital",
      "location": "Melbourne, Australia",
      "role": "",
      "start": 12369182981,
      "end": 21283768123,
      "current": true,
      "description": "Development of single page applications for on-boarding pre-paid and post-paid services in an Adobe Experience Manager environment at Australia’s biggest Telco, Telstra. Using AngularJS, Node.JS, Karma, Jasmine, Swagger and Atlassian products.",
      "tags": [],
      "links": [{
        "name": "Website",
        "url": "https://trademe.co.nz"
      }]
    }]
  }, {
    "class": "education",
    "headline": "Education",
    "subline": "",
    "items": [{
      "institution": "",
      "location": "",
      "start": 128736871273,
      "end": 234838488438,
      "current": true,
      "degree": "",
      "field": "",
      "grade": "",
      "description": "",
      "tags": [],
      "links": []
    }]
  }, {
    "class": "volunteering",
    "headline": "Volunteer Experience",
    "subline": "",
    "items": [{
      "name": "",
      "institution": "",
      "location": "",
      "role": "",
      "cause": "",
      "start": 128736871273,
      "end": 234838488438,
      "current": true,
      "once": "false",
      "description": "",
      "tags": [],
      "links": []
    }]
  }, {
    "class": "buzzword",
    "headline": "",
    "subline": "",
    "items": [{
      "name": "HTML5",
      "starred": true,
    }]
  }, {
    "class": "awards",
    "headline": "Awards",
    "subline": "",
    "items": [{
      "name": "Mobile Solutions Hackerthon 2015 Winner",
      "description": "Development of single page applications for on-boarding pre-paid and post-paid services in an Adobe Experience Manager environment at Australia’s biggest Telco, Telstra. Using AngularJS, Node.JS, Karma, Jasmine, Swagger and Atlassian products.",
      "institution": "IE Digital",
      "location": "Melbourne, Australia",
      "date": 12369182981,
      "tags": [],
      "links": []
    }]
  }, {
    "class": "interests",
    "headline": "Interests",
    "subline": "Stuff I do in my freetime",
    "items": [{
      "name": "Traveling",
      "description": "Lorem ipsum dolor sit amet",
      "tags": [{
        "name": "Freedom"
      }],
      "links": [{
        "name": "Travelblog",
        "url": "https://medium.com/andresander"
      }]
    }]
  }, {
    "class": "contribution",
    "headline": "Contributions",
    "subline": "Some additional work",
    "items": [{
      "name": "Webcomponents Example",
      "description": "Lorem ipsum dolor sit amet",
      "tags": [{
        "name": "Open Source"
      }],
      "links": [{
        "name": "Repository",
        "url": "https://github.com/webcomponents"
      }]
    }]
  }, {
    "class": "language",
    "headline": "Languages",
    "subline": "",
    "items": [{
      "name": "German",
      "spoken": true,
      "written": true,
      "level": "Mother-tongue"
    }]
  }, {
    "class": "recommendation",
    "headline": "Recommendations",
    "subline": "Received feedback",
    "items": [{
      "name": "Mark Gladman",
      "role": "Digital Development Stream Lead",
      "institution": "Telstra Digital",
      "relationship": "Manager",
      "comment": "Andre was an amazing addition to the Telstra Digital development team. He hit the ground running and was comfortable with even the most complicated pieces of work. His strong knowledge of Angular was a huge boon to the team and would strongly recommend his skills and up-beat personality."
    }]
  }]
};
