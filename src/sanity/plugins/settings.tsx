/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver, type ListItemBuilder } from 'sanity/structure'
import { EditIcon } from '@sanity/icons'

interface TemplateItem {
  templateId: string
  [key: string]: unknown
}

interface DocumentAction {
  action: string
  [key: string]: unknown
}

interface NewDocumentOptionsContext {
  creationContext?: {
    type?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface DocumentActionsContext {
  schemaType?: string
  [key: string]: unknown
}

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev: TemplateItem[], context: NewDocumentOptionsContext) => {
        const { creationContext } = context;
        if (creationContext?.type === 'global') {
          return prev.filter(
            (templateItem: TemplateItem) => !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev: DocumentAction[], context: DocumentActionsContext) => {
        const { schemaType } = context;
        if (schemaType && types.includes(schemaType)) {
          return prev.filter((item: DocumentAction) => item.action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// Helper function to build hierarchical page structure with visual tree indicators
const buildPageTree = (
  S: Parameters<StructureResolver>[0],
  pages: Array<{ _id: string; title: string; parent?: string }>,
  parentId: string | null = null,
  level: number = 0,
  isLast: boolean[] = []
): ListItemBuilder[] => {
  const children = pages.filter(
    (page) => (page.parent || null) === parentId
  )

  return children.flatMap((page, index) => {
    const isLastChild = index === children.length - 1
    const hasChildren = pages.some((p) => p.parent === page._id)
    
    // Build visual tree prefix
    let prefix = ''
    if (level > 0) {
      // Add vertical lines for parent levels
      for (let i = 0; i < level - 1; i++) {
        prefix += isLast[i] ? '   ' : '│  '
      }
      // Add connector for current level
      prefix += isLastChild ? '└─ ' : '├─ '
    }
    
    const pageItem = S.listItem()
      .title(`${prefix}${page.title}`)
      .id(page._id)
      .child(
        S.document()
          .id(page._id)
          .schemaType('page')
      )

    // Recursively build children
    const newIsLast = [...isLast, isLastChild]
    const childItems = buildPageTree(S, pages, page._id, level + 1, newIsLast)

    return [pageItem, ...childItems]
  })
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[] = []
): StructureResolver => {
  return (S, context) => {
    const { getClient } = context
    const client = getClient({ apiVersion: '2024-01-01' })

    const singletonItems = typeDefArray.map((typeDef) =>
      S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
    )
    const singletonWithDividers: (ListItemBuilder | ReturnType<typeof S.divider>)[] = []
    singletonItems.forEach((item, idx) => {
      singletonWithDividers.push(item)
      if (idx < singletonItems.length - 1) {
        singletonWithDividers.push(S.divider())
      }
    })

    const items: (ListItemBuilder | ReturnType<typeof S.divider>)[] = []
    
    // Add singleton items if any exist
    if (singletonWithDividers.length > 0) {
      items.push(...singletonWithDividers)
      items.push(S.divider())
    }
    
    // Add hierarchical pages structure (default view)
    items.push(
      S.listItem()
        .title('Pages')
        .icon(EditIcon)
        .child(async () => {
          const pages = await client.fetch(`
            *[_type == "page"] | order(title asc) {
              _id,
              title,
              "parent": coalesce(parent._ref, null),
              "slug": slug.current
            }
          `) as Array<{ _id: string; title: string; parent?: string | null; slug?: string }>

          // Filter out pages with invalid parent references (parent doesn't exist)
          const validPages = pages.filter(page => {
            if (!page.parent) return true // Root pages are valid
            // Check if parent exists in the pages array
            return pages.some(p => p._id === page.parent)
          })

          // Build hierarchical tree starting from root pages (no parent)
          const pageItems = buildPageTree(S, validPages, null, 0, [])

          // If no hierarchy detected, show all pages flat with a message
          if (pageItems.length === 0 && validPages.length > 0) {
            return S.list()
              .title('Pages')
              .items(
                validPages.map(page =>
                  S.listItem()
                    .title(page.title)
                    .id(page._id)
                    .child(
                      S.document()
                        .id(page._id)
                        .schemaType('page')
                    )
                )
              )
          }

          return S.list()
            .title('Pages')
            .items(pageItems)
        })
    )

    items.push(S.divider())
    items.push(S.documentTypeListItem('job').title('Jobs'))
    items.push(S.divider())
    items.push(S.documentTypeListItem('post').title('Blog Posts'))
    items.push(S.divider())
    items.push(S.documentTypeListItem('blogCategory').title('Blog Categories'))
    items.push(S.divider())
    items.push(S.documentTypeListItem('author').title('Blog Authors'))
    items.push(S.divider())
    items.push(S.documentTypeListItem('youtubeVideo').title('YouTube Videos'))
    items.push(S.divider())
    items.push(S.documentTypeListItem('youtubeVideoCategory').title('YouTube Video Categories'))

    return S.list()
      .title('Content')
      .items(items)
  }
}