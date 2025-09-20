'use client'

import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Input, InputGroup } from '@/components/catalyst/input'
import { Subheading, TextSecondary } from '@/components/catalyst/text'
import { Tag } from '@/types'
import { ArrowRightCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

export type TagAutocompleteProps = {
  headingText: string
  descriptionText: string
  setTagsFunction: (tags: Tag[]) => void
  editMode: boolean
  validationError: string
  currentTags: Tag[]
  allTags: Tag[]
  pending: boolean
  placeholder: string
  createNewTagText: string
}

export default function TagAutocomplete({
  headingText,
  descriptionText,
  setTagsFunction,
  editMode,
  validationError,
  currentTags,
  allTags,
  pending,
  placeholder,
  createNewTagText,
}: TagAutocompleteProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(currentTags)
  const [inputValue, setInputValue] = useState('')
  const [filteredTags, setFilteredTags] = useState<Tag[]>([])
  const tagInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTagsFunction(selectedTags)
  }, [selectedTags])

  useEffect(() => {
    // Filter tags based on input value
    const filtered = allTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.some((selected) => selected.id === tag.id)
    )
    setFilteredTags(filtered)
  }, [inputValue, allTags, selectedTags])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Done' || e.key === 'Next') {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = (tagToAdd?: Tag) => {
    if (tagToAdd) {
      setSelectedTags([...selectedTags, tagToAdd])
      setInputValue('')
      return
    }

    const newTagName = tagInputRef.current?.value.trim()
    if (!newTagName) return

    const existingTag = allTags.find((tag) => tag.name.toLowerCase() === newTagName.toLowerCase())
    if (existingTag) {
      setSelectedTags([...selectedTags, existingTag])
    } else {
      setSelectedTags([...selectedTags, { id: '', name: newTagName }])
    }

    setInputValue('')
  }

  return (
    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
      <div className="space-y-1">
        <Subheading>{headingText}</Subheading>
        <TextSecondary>{descriptionText}</TextSecondary>
      </div>

      <div className="col-span-2 space-y-4">
        {editMode && (
          <div className="relative">
            <InputGroup clickableIcon={true}>
              <Input
                type="text"
                aria-label="Meal tags"
                placeholder={placeholder}
                ref={tagInputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleTagKeyDown}
                disabled={!editMode || pending}
              />
              <ArrowRightCircleIcon onClick={() => addTag()} />
            </InputGroup>

            {/* Autocomplete dropdown */}
            {inputValue && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-zinc-800">
                <ul className="max-h-60 overflow-auto py-1">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <li
                        key={tag.id}
                        className="cursor-pointer px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        onClick={() => addTag(tag)}
                      >
                        {tag.name}
                      </li>
                    ))
                  ) : (
                    <li
                      className="cursor-pointer px-4 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      onClick={() => addTag()}
                    >
                      {createNewTagText} "{inputValue}"
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {validationError && (
          <p className="text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500">
            {validationError}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs/6">
          {selectedTags.map((tag, index) => (
            <Badge key={index} color={index % 2 === 0 ? 'teal' : 'zinc'}>
              {tag.name}
              {editMode && (
                <Button
                  className="size-6"
                  plain
                  disabled={!editMode || pending}
                  onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                >
                  <XMarkIcon />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
