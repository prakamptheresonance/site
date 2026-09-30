'use client'

import React, { useState, useMemo } from 'react'
import {
  useField,
  FieldLabel,
  FieldDescription,
  FieldError,
  Button,
} from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { ICON_REGISTRY, ICON_MAP } from '@/lib/icons/registry'

export const IconSelectField: TextFieldClientComponent = (props) => {
  const { field, path: pathFromProps, readOnly } = props
  const { label, required, admin } = field
  const description = admin?.description

  const defaultCategory =
    ((admin?.custom as Record<string, any>)?.category as string) || 'All'

  const { value, setValue, showError, disabled } = useField<string>({
    path: pathFromProps,
  })

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory)

  const selectedDef = value ? ICON_MAP.get(value) : null
  const SelectedIcon = selectedDef?.icon

  // Available unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(ICON_REGISTRY.map((i) => i.category)))
    return ['All', ...cats]
  }, [])

  const filteredIcons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return ICON_REGISTRY.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      if (!matchesCategory) return false

      if (!q) return true

      return (
        item.name.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [searchQuery, selectedCategory])

  const handleSelect = (key: string) => {
    if (disabled || readOnly) return
    setValue(key)
    setIsOpen(false)
  }

  return (
    <div
      className={`field-type ${showError ? 'error' : ''} ${readOnly ? 'read-only' : ''}`}
      id={`field-${pathFromProps?.replace(/\./g, '__')}`}
      style={{ marginBottom: 'calc(var(--base) * 1.25)' }}
    >
      <FieldLabel label={label} required={required} path={pathFromProps} />

      <div className="field-type__wrap">
        <FieldError path={pathFromProps} showError={showError} />
      </div>

      {/* Selected Value Bar: Visible Icon + Name only (no component name) */}
      <div
        style={{
          border: '1px solid var(--theme-border-color, var(--theme-elevation-200))',
          borderRadius: '2px',
          backgroundColor: 'var(--theme-elevation-50)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '2px',
              backgroundColor: 'var(--theme-elevation-100)',
              border: '1px solid var(--theme-border-color, var(--theme-elevation-200))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-elevation-800, #f59e0b)',
              fontSize: '18px',
              flexShrink: 0,
            }}
          >
            {SelectedIcon ? <SelectedIcon /> : <span style={{ opacity: 0.4 }}>—</span>}
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--theme-text)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedDef ? selectedDef.name : 'Select an Icon'}
            </div>
            {selectedDef && (
              <div
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--theme-elevation-500, #888)',
                  marginTop: '1px',
                }}
              >
                {selectedDef.category}
              </div>
            )}
          </div>
        </div>

        {!readOnly && (
          <Button
            buttonStyle="secondary"
            size="small"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
          >
            {isOpen ? 'Close' : selectedDef ? 'Change Icon' : 'Browse Icons'}
          </Button>
        )}
      </div>

      {/* Searchable Options Popover/Panel */}
      {isOpen && !readOnly && (
        <div
          style={{
            marginTop: '8px',
            border: '1px solid var(--theme-border-color, var(--theme-elevation-200))',
            borderRadius: '2px',
            backgroundColor: 'var(--theme-elevation-50)',
            padding: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Search Input */}
          <div style={{ marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Search icons (e.g. temple, festival, corporate, wedding, flute)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '2px',
                backgroundColor: 'var(--theme-elevation-100)',
                border: '1px solid var(--theme-border-color, var(--theme-elevation-200))',
                color: 'var(--theme-text)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Filter Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '5px',
              flexWrap: 'wrap',
              marginBottom: '10px',
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontSize: '0.74rem',
                    border: '1px solid',
                    borderColor: isActive
                      ? 'var(--theme-elevation-800, #f59e0b)'
                      : 'var(--theme-border-color, var(--theme-elevation-200))',
                    backgroundColor: isActive
                      ? 'var(--theme-elevation-800, #f59e0b)'
                      : 'var(--theme-elevation-100)',
                    color: isActive ? '#000' : 'var(--theme-text)',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* List of Visible Icons with Name (No Component Name Shown) */}
          <div
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '6px',
            }}
          >
            {filteredIcons.length === 0 ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '24px 0',
                  color: 'var(--theme-elevation-500)',
                  fontSize: '0.82rem',
                }}
              >
                No icons found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredIcons.map((item) => {
                const isSelected = value === item.key
                const IconComponent = item.icon

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleSelect(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '2px',
                      border: '1px solid',
                      borderColor: isSelected
                        ? 'var(--theme-elevation-800, #f59e0b)'
                        : 'var(--theme-border-color, var(--theme-elevation-150))',
                      backgroundColor: isSelected
                        ? 'var(--theme-elevation-200)'
                        : 'var(--theme-elevation-100)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        color: isSelected
                          ? 'var(--theme-elevation-800, #f59e0b)'
                          : 'var(--theme-text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent />
                    </div>
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 600 : 400,
                        color: 'var(--theme-text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}

      {description && (
        <FieldDescription description={description} path={pathFromProps} />
      )}
    </div>
  )
}
