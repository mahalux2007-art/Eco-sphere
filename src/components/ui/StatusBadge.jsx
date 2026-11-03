import Badge from './Badge';
import { STATUS_STYLES, CATEGORY_STYLES, LISTING_TYPE_STYLES, INITIATIVE_STATUS_STYLES } from '../../data/constants';

export function ReportStatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Submitted;
  return (
    <Badge bg={s.bg} text={s.text} dot={s.dot}>
      {status}
    </Badge>
  );
}

export function CategoryBadge({ category }) {
  const s = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
  return (
    <Badge bg={s.bg} text={s.text}>
      {category}
    </Badge>
  );
}

export function ListingTypeBadge({ type }) {
  const s = LISTING_TYPE_STYLES[type] || LISTING_TYPE_STYLES.Free;
  return (
    <Badge bg={s.bg} text={s.text}>
      {type}
    </Badge>
  );
}

export function InitiativeStatusBadge({ status }) {
  const s = INITIATIVE_STATUS_STYLES[status] || INITIATIVE_STATUS_STYLES.Upcoming;
  return (
    <Badge bg={s.bg} text={s.text}>
      {status}
    </Badge>
  );
}
