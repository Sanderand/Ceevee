import { Divider } from './models/divider.model';
import { Education } from './models/education.model';
import { RecommendationFields } from './models/recommendation.model';
import { DetailListItem } from './models/detail-list-item.model';
import { SkillFields } from './models/skill.model';
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
    fields: RecommendationFields,
    class: 'recommendation',
    name: 'Recommendation',
  },
  DETAIL_LIST: {
    class: 'detail-list',
    model: new DetailListItem()
  },
  SKILL: {
    fields: SkillFields,
    class: 'skill',
    name: 'Skill',
  },
  TAG: {
    class: 'tag',
    model: new Tag()
  }
};
