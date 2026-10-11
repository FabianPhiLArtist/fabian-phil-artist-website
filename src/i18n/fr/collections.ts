import type { CollectionSlug } from '@/data/collections'
import type { FrCollectionContent } from './types'

// Keyed by collection slug (shared with English). Empty: no French collection page is live.
export const frCollections: Partial<Record<CollectionSlug, FrCollectionContent>> = {}
