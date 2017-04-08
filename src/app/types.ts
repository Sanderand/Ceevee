import { Divider } from './models/divider.model';
import { Education } from './models/education.model';
import { Recommendation } from './models/recommendation.model';
import { DetailListItem } from './models/detail-list-item.model';
import { Skill } from './models/skill.model';
import { Tag } from './models/tag.model';

export const TYPES = {
  DIVIDER: {
    class: 'divider',
    model: new Divider()
  },
  EDUCATION: {
    class: 'education',
    model: new Education()
  },
  RECOMMENDATION: {
    class: 'recommendation',
    model: new Recommendation()
  },
  DETAIL_LIST: {
    class: 'detail-list',
    model: new DetailListItem()
  },
  SKILLS: {
    class: 'skills',
    model: new Skill()
  },
  TAG: {
    class: 'tag',
    model: new Tag()
  }
};
