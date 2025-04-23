"use client"

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";

// Type definitions for TypeScript
/**
 * @typedef {Object} ExperienceOption
 * @property {string} value - Unique value for the option
 * @property {string} label - Descriptive text for the option
 * @property {string} icon - SVG icon as string
 * @property {string} [category] - Category it belongs to (optional)
 * @property {string} [description] - Additional description (optional)
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Unique identifier for the category
 * @property {string} label - Category name
 */

/**
 * Reusable experience selector component
 * 
 * @param {Object} props - Component properties
 * @param {ExperienceOption[]} props.options - Available options
 * @param {Category[]} [props.categories] - Categories for grouping (optional)
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Function called when selection changes
 * @param {string} [props.label] - Field label (optional)
 * @param {string} [props.placeholder] - Text when no selection (optional)
 * @param {Object} [props.helpText] - Help text by category (optional)
 * @param {boolean} [props.required] - If the field is required (optional)
 * @param {string} [props.className] - Additional CSS classes (optional)
 */
const ExperienceTypeSelector = ({
    options,
    categories,
    value,
    onChange,
    label = "Select an option",
    placeholder = "Select an option",
    helpText = {},
    required = false,
    className = "",
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Find the selected option when value changes
    useEffect(() => {
        if (value) {
            const option = options.find((opt) => opt.value === value);
            setSelectedOption(option || null);

            // Determine the category if categories exist
            if (option && categories?.length) {
                const category = categories.find((cat) =>
                    options.filter(opt => opt.category === cat.id)
                        .some(opt => opt.value === value)
                );
                setSelectedCategory(category || null);
            }
        } else {
            setSelectedOption(null);
            setSelectedCategory(null);
        }
    }, [value, options, categories]);

    // Handle selection change
    const handleChange = (newValue) => {
        onChange(newValue);
    };

    // Process SVG icons to ensure consistent sizing and prevent overflow
    const processIconSvg = (svgString, width = 16, height = 16) => {
        if (!svgString) return "";

        // Normalize icon size
        return svgString
            .replace(/width="([^"]+)"/g, `width="${width}"`)
            .replace(/height="([^"]+)"/g, `height="${height}"`)
            .replace(/viewBox="([^"]+)"/g, (match) => match); // Preserve viewBox if exists
    };

    // Group options by category if categories are provided
    const getGroupedOptions = () => {
        if (!categories || categories.length === 0) {
            return { uncategorized: options };
        }

        const grouped = {};

        // Initialize all categories
        categories.forEach(cat => {
            grouped[cat.id] = [];
        });

        // Group options
        options.forEach(option => {
            const categoryId = option.category || "uncategorized";

            if (!grouped[categoryId]) {
                grouped[categoryId] = [];
            }

            grouped[categoryId].push(option);
        });

        return grouped;
    };

    const groupedOptions = getGroupedOptions();

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <FormLabel className="block">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
            )}

            <Select
                value={value}
                onValueChange={handleChange}
            >
                <SelectTrigger className="w-full">
                    {value ? (
                        <div className="flex items-center space-x-2 truncate max-w-full">
                            {selectedOption?.icon && (
                                <span
                                    className="flex-shrink-0 inline-flex items-center justify-center"
                                    style={{ minWidth: '14px', minHeight: '14px' }}
                                    dangerouslySetInnerHTML={{
                                        __html: processIconSvg(selectedOption.icon, 14, 14)
                                    }}
                                />
                            )}
                            <span className="truncate">
                                {selectedOption?.label || value}
                            </span>
                        </div>
                    ) : (
                        <SelectValue placeholder={placeholder} />
                    )}
                </SelectTrigger>

                <SelectContent>
                    {categories && categories.length > 0 ? (
                        // Render options grouped by category
                        categories.map((category, index) => (
                            <div key={category.id}>
                                {/* Separator except for the first category */}
                                {index > 0 && (
                                    <div className="px-1 pt-2 mt-1 border-t"></div>
                                )}

                                {/* Category title */}
                                <div className="px-1 py-1.5 text-sm font-medium text-muted-foreground">
                                    {category.label}
                                </div>

                                {/* Options in this category */}
                                {groupedOptions[category.id]?.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="flex items-center py-1.5"
                                    >
                                        <div className="flex items-center w-full">
                                            {option.icon && (
                                                <span
                                                    className="mr-2 flex-shrink-0 inline-flex items-center justify-center"
                                                    style={{ minWidth: '16px', minHeight: '16px' }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: processIconSvg(option.icon, 16, 16)
                                                    }}
                                                />
                                            )}
                                            <span className="truncate">{option.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </div>
                        ))
                    ) : (
                        // Render options without categories
                        options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="flex items-center py-1.5"
                            >
                                <div className="flex items-center w-full">
                                    {option.icon && (
                                        <span
                                            className="mr-2 flex-shrink-0 inline-flex items-center justify-center"
                                            style={{ minWidth: '16px', minHeight: '16px' }}
                                            dangerouslySetInnerHTML={{
                                                __html: processIconSvg(option.icon, 16, 16)
                                            }}
                                        />
                                    )}
                                    <span className="truncate">{option.label}</span>
                                </div>
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>

            {/* Help text based on the selected type */}
            {selectedCategory && helpText[selectedCategory.id] && (
                <p className="text-sm text-muted-foreground">
                    {helpText[selectedCategory.id]}
                </p>
            )}
        </div>
    );
};

export default ExperienceTypeSelector;