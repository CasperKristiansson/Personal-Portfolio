import { TimeLine, TimelineItem } from "../shared/timeLine";

const timelineItems: TimelineItem[] = [];

export const Experience: React.FC = () => {
  return <TimeLine timelineItems={timelineItems} title="Experience" />;
};
