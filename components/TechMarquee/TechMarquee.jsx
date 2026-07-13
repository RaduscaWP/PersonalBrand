import {
  Atom,
  Binary,
  Blocks,
  Bot,
  Braces,
  Code2,
  Database,
  Figma,
  FileCode2,
  FileType,
  GitBranchPlus,
  MailCheck,
  Orbit,
  Paintbrush,
  PanelsTopLeft,
  Rocket,
  SquareTerminal,
  Workflow,
} from 'lucide-react';
import styles from './TechMarquee.module.scss';

const iconRegistry = {
  Atom,
  Binary,
  Blocks,
  Bot,
  Braces,
  Code2,
  Database,
  Figma,
  FileCode2,
  FileType,
  GitBranchPlus,
  MailCheck,
  Orbit,
  Paintbrush,
  PanelsTopLeft,
  Rocket,
  SquareTerminal,
  Workflow,
};

export default function TechMarquee({ items }) {
  const renderItems = (clone = false) => (
    <div className={styles.group} aria-hidden={clone ? 'true' : undefined}>
      {items.map((item) => {
        const Icon = iconRegistry[item.icon] || Code2;

        return (
          <span key={`${clone ? 'clone-' : ''}${item.name}`} className={styles.item}>
            <Icon size={16} strokeWidth={1.8} />
            {item.name}
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      className={styles.marquee}
      role="region"
      tabIndex={0}
      aria-label="Technology stack marquee. Focus to pause movement."
    >
      <div className={styles.track}>
        {renderItems()}
        {renderItems(true)}
      </div>
    </div>
  );
}
