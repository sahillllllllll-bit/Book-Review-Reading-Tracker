"use client"

import React, { createContext, useContext, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = createContext()

const Select = React.forwardRef((props, ref) => {
  const { value, onValueChange, defaultValue, children, ...otherProps } = props
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  const [isOpen, setIsOpen] = useState(false)

  const currentValue = value !== undefined ? value : internalValue
  const handleValueChange = onValueChange || setInternalValue

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        isOpen,
        setIsOpen,
      }}
    >
      <div ref={ref} className="relative" {...otherProps}>
        {children}
      </div>
    </SelectContext.Provider>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const context = useContext(SelectContext)

  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => context?.setIsOpen(!context?.isOpen)}
      {...otherProps}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef((props, ref) => {
  const { placeholder, ...otherProps } = props
  const context = useContext(SelectContext)

  return (
    <span ref={ref} {...otherProps}>
      {context?.value || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const context = useContext(SelectContext)

  if (!context?.isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef((props, ref) => {
  const { className, children, value, ...otherProps } = props
  const context = useContext(SelectContext)

  const handleClick = () => {
    context?.onValueChange(value)
    context?.setIsOpen(false)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
