import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Write in Markdown',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Drop a <code>.md</code> file into the <code>docs/</code> folder and
        it renders as a page. The sidebar is generated from the folder tree,
        so new docs show up in the navigation automatically.
      </>
    ),
  },
  {
    title: 'Organized by Folders',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Group related docs into subfolders under <code>docs/</code>. Use
        front matter (<code>sidebar_position</code>, <code>sidebar_label</code>)
        or a <code>_category_.json</code> to control order and labels.
      </>
    ),
  },
  {
    title: 'Auto-Deployed',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Every push to <code>main</code> triggers a GitHub Actions build that
        publishes the site to GitHub Pages. No manual build or upload step.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
