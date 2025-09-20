'use client'

import { BadgeButton } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown'
import { Input, InputGroup } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Text } from '@/components/catalyst/text'
import { Meal, Notification, ServerActionResponse, Tag } from '@/types'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DeleteItemComponent from './DeleteItemComponent'

type ListComponentProps = {
  title: string
  items: Meal[] | Tag[] | Notification[]
  deleteFunction: (id: string) => Promise<ServerActionResponse>
  listType: 'Meals' | 'Tags' | 'Notifications'
}

export default function ListComponent({ title, items, deleteFunction, listType }: ListComponentProps) {
  const t = useTranslations('General')
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState(items)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from all meals
  const allTags = useMemo(() => {
    if (listType !== 'Meals') {
      return []
    }

    const tagMap = new Map<string, Tag>()

    ;(items as Meal[]).forEach((meal) => {
      meal.tags.forEach((tag) => {
        if (!tagMap.has(tag.id)) {
          tagMap.set(tag.id, tag)
        }
      })
    })

    return Array.from(tagMap.values())
  }, [items, listType])

  // Combined search and tag filter
  const filterItems = useCallback(
    (searchValue: string, tagIds: string[]) => {
      let filtered = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))

      if (listType === 'Meals' && tagIds.length > 0) {
        filtered = filtered.filter((item) => {
          const meal = item as Meal
          return tagIds.every((tagId) => meal.tags.some((tag) => tag.id === tagId))
        })
      }

      setFilteredItems(filtered)
    },
    [items, listType]
  )

  // Update search term and trigger filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterItems(value, selectedTags)
  }

  const handleTagClick = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId]
    setSelectedTags(newSelectedTags)
    filterItems(searchTerm, newSelectedTags)
  }

  // Initialize filtered items
  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  const renderTags = (item: Meal | Tag | Notification) => {
    if (listType !== 'Meals' || !('tags' in item)) {
      return null
    }

    const meal = item as Meal
    const visibleTags = meal.tags.slice(0, 3)
    const remainingCount = meal.tags.length - 3

    return (
      <div className="hidden items-center gap-2 md:flex">
        {visibleTags.map((tag, index) => (
          <BadgeButton
            key={index}
            color={index % 2 === 0 ? 'teal' : 'zinc'}
            className="text-xs"
            href={`/tags/${tag.id}`}
          >
            {tag.name}
          </BadgeButton>
        ))}
        {remainingCount > 0 && <span className="text-sm text-teal-500">+{remainingCount} more</span>}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder={t('searchPlaceholder')} value={searchTerm} onChange={handleSearch} />
              </InputGroup>
            </div>
          </div>
          {listType === 'Meals' && allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <BadgeButton
                  key={tag.id}
                  color={selectedTags.includes(tag.id) ? 'teal' : 'zinc'}
                  className={clsx('text-xs transition-colors', selectedTags.includes(tag.id) && 'ring-2 ring-teal-500')}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.name}
                </BadgeButton>
              ))}
            </div>
          )}
        </div>
        <Button href={`${pathname}/create`} color="teal">
          {t('create')}
        </Button>
      </div>
      {items.length === 0 && <div className="mt-10 text-center italic">{t(`noItems${listType}`)}</div>}
      {items.length !== 0 && filteredItems.length === 0 && (
        <div className="mt-10 text-center italic">{t(`noItemsFound${listType}`)}</div>
      )}
      <ul className="mt-10">
        {filteredItems.map((item, index) => (
          <li key={item.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={item.id} className="flex gap-6 py-6">
                <div className="space-y-1.5">
                  <Text className="hover:font-bold">
                    <Link href={`${pathname}/${item.id}`}>{item.name}</Link>
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {renderTags(item)}
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={`${pathname}/${item.id}`}>{t('view')}</DropdownItem>
                    <DropdownItem href={`${pathname}/${item.id}?edit`}>{t('edit')}</DropdownItem>
                    <DeleteItemComponent id={item.id} deleteFunction={deleteFunction} />
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
