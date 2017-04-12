import { DividerFields } from './models/divider.model';
import { EducationFields } from './models/education.model';
import { RecommendationFields } from './models/recommendation.model';
import { DetailListItemFields } from './models/detail-list-item.model';
import { SkillFields } from './models/skill.model';
import { DetailsFields } from './models/details.model';

export const TYPES = {
  DETAILS: {
    class: 'details',
    fields: DetailsFields
  },
  DIVIDER: {
    class: 'divider',
    fields: DividerFields
  },
  EDUCATION: {
    class: 'education',
    fields: EducationFields
  },
  RECOMMENDATION: {
    class: 'recommendation',
    fields: RecommendationFields
  },
  DETAIL_LIST: {
    class: 'detail-list',
    fields: DetailListItemFields
  },
  SKILL: {
    class: 'skill',
    fields: SkillFields
  }
};
