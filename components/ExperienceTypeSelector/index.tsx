"use client"

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";

// Definición de tipos para TypeScript
/**
 * @typedef {Object} ExperienceOption
 * @property {string} value - Valor único para la opción
 * @property {string} label - Texto descriptivo para la opción
 * @property {string} icon - SVG del icono como string
 * @property {string} [category] - Categoría a la que pertenece (opcional)
 * @property {string} [description] - Descripción adicional (opcional)
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Identificador único de la categoría
 * @property {string} label - Nombre de la categoría
 */

/**
 * Componente selector de experiencias reutilizable
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ExperienceOption[]} props.options - Opciones disponibles
 * @param {Category[]} [props.categories] - Categorías para agrupar (opcional)
 * @param {string} props.value - Valor seleccionado actualmente
 * @param {Function} props.onChange - Función llamada al cambiar la selección
 * @param {string} [props.label] - Etiqueta del campo (opcional)
 * @param {string} [props.placeholder] - Texto cuando no hay selección (opcional)
 * @param {Object} [props.helpText] - Textos de ayuda por categoría (opcional)
 * @param {boolean} [props.required] - Si el campo es obligatorio (opcional)
 * @param {string} [props.className] - Clases CSS adicionales (opcional)
 */
const ExperienceTypeSelector = ({
    options,
    categories,
    value,
    onChange,
    label = "Selecciona una opción",
    placeholder = "Selecciona una opción",
    helpText = {},
    required = false,
    className = "",
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Encontrar la opción seleccionada cuando cambia el valor
    useEffect(() => {
        if (value) {
            const option = options.find((opt) => opt.value === value);
            setSelectedOption(option || null);

            // Determinar la categoría si existen categorías
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

    // Manejar el cambio de selección
    const handleChange = (newValue) => {
        onChange(newValue);
    };

    // Agrupar opciones por categoría si se proporcionan categorías
    const getGroupedOptions = () => {
        if (!categories || categories.length === 0) {
            return { uncategorized: options };
        }

        const grouped = {};

        // Inicializar todas las categorías
        categories.forEach(cat => {
            grouped[cat.id] = [];
        });

        // Agrupar opciones
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
                        <div className="flex items-center truncate max-w-full">
                            {selectedOption?.icon && (
                                <span
                                    className="mr-2 flex-shrink-0"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedOption.icon.replace(/width="([^"]+)"/, 'width="14"').replace(/height="([^"]+)"/, 'height="14"')
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
                        // Renderizar opciones agrupadas por categoría
                        categories.map((category, index) => (
                            <div key={category.id}>
                                {/* Separador excepto en la primera categoría */}
                                {index > 0 && (
                                    <div className="px-1 pt-2 mt-1 border-t"></div>
                                )}

                                {/* Título de la categoría */}
                                <div className="px-1 py-1.5 text-sm font-medium text-muted-foreground">
                                    {category.label}
                                </div>

                                {/* Opciones de esta categoría */}
                                {groupedOptions[category.id]?.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="flex items-center"
                                    >
                                        {option.icon && (
                                            <span
                                                className="mr-2"
                                                dangerouslySetInnerHTML={{ __html: option.icon }}
                                            />
                                        )}
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </div>
                        ))
                    ) : (
                        // Renderizar opciones sin categorías
                        options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="flex items-center"
                            >
                                {option.icon && (
                                    <span
                                        className="mr-2"
                                        dangerouslySetInnerHTML={{ __html: option.icon }}
                                    />
                                )}
                                {option.label}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>

            {/* Texto de ayuda según el tipo seleccionado */}
            {selectedCategory && helpText[selectedCategory.id] && (
                <p className="text-sm text-muted-foreground">
                    {helpText[selectedCategory.id]}
                </p>
            )}
        </div>
    );
};

export default ExperienceTypeSelector;