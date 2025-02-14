import React from 'react';
import PropTypes from 'prop-types';

import { SEO } from '@newrelic/gatsby-theme-newrelic';

const METADATA = [
  {
    name: 'google-site-verification',
    content: 'He_vizRXYX_mUhwBe3BmyaMxNnVRAZbq_Jtm2A0e4WY',
  },
];

// List of urls we don't want to have indexed by Swifttype or search engines
const DO_NOT_INDEX = [
  'docs/licenses/license-information/usage-plans/archived-add-on',
];

const surveyRecaptcha = (
  <script
    key="google-recaptcha"
    async
    defer
    src="https://www.google.com/recaptcha/api.js?render=6Lehf-4oAAAAAK-sCeVSRUrRQfImJdwgc2pPkOwZ"
  />
);

const isStyleGuidePage = (url) => {
  return url.includes('docs/style-guide');
};

const isAgileHandbookPage = (url) => {
  return url.includes('docs/agile-handbook');
};

const isMdxTestPage = (url) => url.includes('docs/mdx-test-page');

const doNotIndex = (url, arr) => {
  return arr.some((item) => url.includes(item));
};

const isExcludedFromIndexing = (url) =>
  isStyleGuidePage(url) ||
  isAgileHandbookPage(url) ||
  isMdxTestPage(url) ||
  doNotIndex(url, DO_NOT_INDEX);

const DocsSiteSeo = ({
  location,
  title,
  description,
  type,
  tags,
  disableSwiftype,
}) => (
  <SEO location={location} title={title}>
    {process.env.GATSBY_ENVIRONMENT === 'staging' && (
      <meta name="robots" content="noindex" />
    )}
    {disableSwiftype && <meta name="st:robots" content="nofollow, noindex" />}
    {METADATA.map((data) => (
      <meta key={data.name} {...data} />
    ))}

    {(tags || []).map((tag) => (
      <meta
        key={tag}
        name="tags"
        className="swiftype"
        data-type="string"
        content={tag}
      />
    ))}

    {type && (
      <meta
        className="swiftype"
        name="document_type"
        data-type="enum"
        content={type}
      />
    )}

    {title && (
      <meta
        className="swiftype"
        name="title"
        data-type="string"
        content={title}
      />
    )}

    {isExcludedFromIndexing(location.pathname) && (
      <meta name="robots" content="noindex, nofollow" />
    )}

    {(description || title) && (
      <meta name="description" content={description || title} />
    )}

    {surveyRecaptcha}
  </SEO>
);

DocsSiteSeo.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  tags: PropTypes.array,
  disableSwiftype: PropTypes.bool,
};

export default DocsSiteSeo;
