import {
  Bot,
  Code2,
  Cpu,
  Figma,
  Globe,
  Layout,
  MailCheck,
  Palette,
  PanelsTopLeft,
  Route,
  Search,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Workflow,
} from 'lucide-react';
import styles from './ServiceCard.module.scss';

const iconRegistry = {
  Bot,
  Code2,
  Cpu,
  Figma,
  Globe,
  Layout,
  MailCheck,
  Palette,
  PanelsTopLeft,
  Route,
  Search,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Workflow,
};

function ServiceFace({ service, Icon, back = false, interactive = false }) {
  return (
    <div
      className={`${styles.face} ${back ? styles.back : styles.front}`}
      aria-hidden={back ? true : undefined}
    >
      <span className={styles.badge}>{service.badge}</span>

      <div className={styles.iconWrap}>
        <Icon size={32} strokeWidth={1.9} />
      </div>

      <div className={styles.copy}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.description}</p>
        {back && interactive ? (
          <span className={styles.returnHint}>Tap or hover to return</span>
        ) : null}
      </div>
    </div>
  );
}

export default function ServiceCard({
  service,
  active = false,
  interactive = false,
  onActivate,
  onToggle,
  onDeactivate,
  className = '',
}) {
  const Icon = iconRegistry[service.icon] || Sparkles;
  const Tag = interactive ? 'button' : 'article';

  const interactiveProps = interactive
    ? {
        type: 'button',
        onPointerEnter: (event) => {
          if (event.pointerType !== 'touch') onActivate?.();
        },
        onPointerDown: (event) => {
          event.currentTarget.dataset.pointerType = event.pointerType;
        },
        onPointerLeave: (event) => {
          if (
            event.pointerType !== 'touch' &&
            !event.currentTarget.matches(':focus-visible')
          ) {
            onDeactivate?.();
          }
        },
        onFocus: (event) => {
          if (event.currentTarget.matches(':focus-visible')) onActivate?.();
        },
        onClick: (event) => {
          if (event.detail === 0) {
            onToggle?.();
            return;
          }

          if (event.currentTarget.dataset.pointerType === 'touch') onToggle?.();
        },
        'aria-pressed': active,
      }
    : {};

  return (
    <Tag
      className={`${styles.card} ${interactive ? styles.interactive : ''} ${active ? styles.active : ''} ${className}`}
      {...interactiveProps}
    >
      <div className={styles.flipper}>
        <ServiceFace service={service} Icon={Icon} />
        <ServiceFace service={service} Icon={Icon} back interactive={interactive} />
      </div>
    </Tag>
  );
}
