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
    "class": "text",
    "title": "Mission",
    "content": "Making the web a better place!"
  }, {
    "class": "experience",
    "title": "Experience",
    "items": [{
      "title": "JavaScript Developer",
      "institution": "Trade Me",
      "link": "https://trademe.co.nz",
      "location": "Wellington, New Zealand",
      "start": 1491105337407,
      "end": null,
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
      "start": 1491105337407,
      "end": 1491105337407,
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
      "start": 1491105337407,
      "end": 1491105337407,
      "title": "Bachelor of Science",
      "field": "Computer Science",
      "grade": "1.5",
      "description": "Lorem ipsum dolor sit amet"
    }, {
      "institution": "Hüffertgymnasium",
      "link": "https://hgw.de",
      "location": "Warburg, Germany",
      "start": 1491105337407,
      "end": 1491105337407,
      "title": "Highschool Degree",
      "field": "Mathematics, English, Computer Science, Geographie",
      "grade": "1.6",
      "description": "Lorem ipsum dolor sit amet"
    }]
  }, {
    "class": "skills",
    "title": "Skills",
    "items": [{
      "title": "HTML5",
      "description": "Lorem ipsum dolor sit amet",
      "percentage": 0.5,
    }, {
      "title": "Angular",
      "description": "Lorem ipsum dolor sit amet",
      "percentage": 0.7,
    }, {
      "title": "Typescript",
      "description": "Lorem ipsum dolor sit amet",
      "percentage": 0.9,
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
      "start": 1491105337407,
      "end": 1491105337407,
      "current": true,
      "once": "false",
      "description": "",
      "tags": [],
      "links": []
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
      "date": 1491105337407,
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
    "class": "skills",
    "title": "Languages",
    "items": [{
      "title": "German",
      "description": "Mother-tongue"
    }, {
      "title": "English",
      "description": "Spoken and written proficiency"
    }, {
      "title": "French",
      "description": "Basic language skills"
    }]
  }]
};
