import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './BentoGrid.module.scss';

const sizeMap = {
  large:  styles.large,
  tall:   styles.tall,
  wide:   styles.wide,
  square: styles.square,
};

export default function BentoGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} sizeClass={sizeMap[p.bentoSize] || styles.square} />
      ))}
    </div>
  );
}
