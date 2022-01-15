import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'

import { H1, H2, H3, H4, P1, Bold, Italic} from '@/components/typography'

/* 
  Rich text options maps Contentful document content to
  custom components based on their type 
*/
export default function getRenderOptions(links: any = null): Options {
  const assetBlockMap = new Map()

  if (links) {
    for (const asset of links.assets.block) {
      assetBlockMap.set(asset.sys.id, asset)
    }
  }

  return {
    renderText: (text) => text.replace('!', '?'),
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
    },
    // TODO add support for other block types
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
      [BLOCKS.PARAGRAPH]: (node, children) => <P1>{children}</P1>,
    },
  }
}
