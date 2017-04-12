import { DividerFields } from './models/divider.model';
import { EducationFields } from './models/education.model';
import { RecommendationFields } from './models/recommendation.model';
import { DetailListItemFields } from './models/detail-list-item.model';
import { SkillFields } from './models/skill.model';
import { DetailsFields } from './models/details.model';

export const TYPES = {
  DETAILS: {
    class: 'details',
    name: 'Details',
    fields: DetailsFields
  },
  DIVIDER: {
    class: 'divider',
    name: 'Divider',
    fields: DividerFields
  },
  EDUCATION: {
    class: 'education',
    name: 'Education',
    fields: EducationFields
  },
  RECOMMENDATION: {
    class: 'recommendation',
    name: 'Recommendation',
    fields: RecommendationFields
  },
  DETAIL_LIST: {
    class: 'detail-list',
    name: 'Item',
    fields: DetailListItemFields
  },
  SKILL: {
    class: 'skill',
    name: 'Skill',
    fields: SkillFields
  }
};
