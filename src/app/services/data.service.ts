import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs';

import { CV } from '../models/cv.model';

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
    "address": "Habichtsweg 14, 34414 Warburg",
    "email": "mail@andresander.com",
    "url": "http://andresander.com",
    "tel": "022 348 1354"
  },
  "theme": {
    "name": "Default",
    "class": "default"
  },
  "items": [{
    "class": "divider",
    "title": "Making the Web a better place!"
  }, {
    "class": "detail-list",
    "title": "Experience",
    "items": [{
      "title": "JavaScript Developer",
      "institution": "Trade Me",
      "link": "https://trademe.co.nz",
      "location": "Wellington, New Zealand",
      "start": "04/2017",
      "end": "present",
      "description": "Anyway, some uni student is just Jim Hickey in disguise, to find the true meaning of life, one must start wobbling with the Jafa, mate. After the tomato sauce is skived off, you add all the cool pauas to the jersey you've got yourself a meal.",
      "tags": [
        { name: 'typescript' },
        { name: 'angular' }
      ]
    }, {
      "title": "Front End Developer",
      "institution": "IE Digital",
      "link": "https://ie.com.au",
      "location": "Melbourne, Australia",
      "start": "04/2017",
      "end": "04/2017",
      "description": "Development of single page applications for on-boarding pre-paid and post-paid services in an Adobe Experience Manager environment at Australia’s biggest Telco, Telstra. Using AngularJS, Node.JS, Karma, Jasmine, Swagger and Atlassian products.",
      "tags": [
        { name: 'ng1' },
        { name: 'karma' },
        { name: 'node.js' },
        { name: 'AEM' }
      ]
    }]
  }, {
    "class": "recommendation",
    "title": "Recommendations",
    "items": [{
      "name": "Mark Gladman",
      "institution": "Telstra Digital",
      "relationship": "Manager",
      "comment": "Andre was an amazing addition to the Telstra Digital development team. He hit the ground running and was comfortable with even the most complicated pieces of work. His strong knowledge of Angular was a huge boon to the team and would strongly recommend his skills and up-beat personality."
    }]
  }, {
    "class": "education",
    "title": "Education",
    "items": [{
      "institution": "University of Applied Sciences Darmstadt",
      "link": "https://hda.de",
      "location": "Darmstadt, Germany",
      "start": "04/2017",
      "end": "04/2017",
      "title": "Bachelor of Science",
      "field": "Computer Science",
      "grade": "1.5",
      "description": "Lorem ipsum dolor sit amet"
    }, {
      "institution": "Hüffertgymnasium",
      "link": "https://hgw.de",
      "location": "Warburg, Germany",
      "start": "04/2017",
      "end": "04/2017",
      "title": "Highschool Degree",
      "field": "Mathematics, English, Computer Science, Geographie",
      "grade": "1.6",
      "description": "Lorem ipsum dolor sit amet"
    }]
  }, {
    "class": "detail-list",
    "title": "Volunteering",
    "items": [{
      "title": "First Aider",
      "description": "Lorem ipsum dolor sit amet.",
      "institution": "German Red Cross",
      "location": "Warburg, Germany",
      "start": "04/2017",
      "end": "present",
      "link": "https://drk.de",
      "tags": [{
        name: 'Charity'
      }]
    }]
  }, {
    "class": "detail-list",
    "title": "Awards",
    "items": [{
      "title": "Mobile Solutions Hackerthon 2015 Winner",
      "description": "Development of a location based service application for geo-fencing.",
      "institution": "Deutsche Telekom AG",
      "location": "Darmstadt, Germany",
      "start": null,
      "end": "04/2017",
      "link": "#",
      "tags": [{
        name: 'Hackathon'
      }, {
        name: 'Mobile'
      }]
    }]
  }, {
    "class": "detail-list",
    "title": "Contributions",
    "items": [{
      "title": "webcomponents.js",
      "description": "Lorem ipsum dolor sit amet",
      "institution": "Github",
      "location": null,
      "start": null,
      "end": "04/2017",
      "link": "#",
      "tags": [{
        name: 'Github'
      }, {
        name: 'Open Source'
      }, {
        name: 'Web Components'
      }]
    }]
  }, {
    "class": "skills",
    "title": "Languages",
    "items": [{
      "title": "German",
      "percentage": 1.0,
      "description": "Mother-tongue"
    }, {
      "title": "English",
      "percentage": 0.9,
      "description": "Spoken and written proficiency"
    }, {
      "title": "French",
      "percentage": 0.1,
      "description": "Basic language skills"
    }]
  }, {
    "class": "skills",
    "title": "Interests",
    "items": [{
      "title": "Traveling",
      "description": "Lorem ipsum dolor sit amet"
    },{
      "title": "Yoga",
      "description": "Lorem ipsum dolor sit amet"
    }]
  }, {
    "class": "divider"
  }]
};
