import styles from './Marquee.module.scss';

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

function iconUrl(icon) {
  const special = {
    nextjs:   `${ICON_BASE}/nextjs/nextjs-original.svg`,
    vscode:   `${ICON_BASE}/vscode/vscode-original.svg`,
    threejs:  `${ICON_BASE}/threejs/threejs-original.svg`,
  };
  return special[icon] || `${ICON_BASE}/${icon}/${icon}-original.svg`;
}

export default function Marquee({ items }) {
  const loop = [...items, ...items];

  return (
    <div className={styles.marquee} aria-label="Tech stack">
      <div className={styles.track}>
        {loop.map((item, i) => (
          <div className={styles.item} key={`${item.name}-${i}`} aria-hidden={i >= items.length}>
            <img
              src={iconUrl(item.icon)}
              alt=""
              loading="lazy"
              width={28}
              height={28}
              className={styles.icon}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
