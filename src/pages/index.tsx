import type {ReactNode} from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

// The site has no standalone landing page — hitting the root sends
// visitors straight into the docs.
export default function Home(): ReactNode {
  return <Redirect to={useBaseUrl('/docs/overview')} />;
}
