import { createClient } from 'next-sanity'

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from '@/src/sanity/lib/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
  perspective: 'published',
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})

export async function getChildPage(parentSlug: string, childSlug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $childSlug && parent->slug.current == $parentSlug][0] {
      title,
      slug,
      content,
      "parent": parent->{
        title,
        slug
      }
    }`,
    { parentSlug, childSlug }
  );
}

