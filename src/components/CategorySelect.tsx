import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select from 'react-select';

interface Category {
    name: string,
    slug: string,
    url: string,
}

interface CategorySelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function CategorySelect<T extends FieldValues>({ name, control }: CategorySelectProps<T>) {
  
  const saved = sessionStorage.getItem("categories");
  const categoriesFromStorage = saved ? JSON.parse(saved) : [];
  const [categories, setCategories] = useState<{ value: string; label: string }[]>(categoriesFromStorage);
  
  useEffect(() => {
    // предусмотрел возможность переиспользования результата полученного по API
    if (categoriesFromStorage.length > 0) return;

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        const options = data.map((category: Category) => ({
          value: category.name,
          label: category.slug,
        }));
        setCategories(options);
        sessionStorage.setItem("categories", JSON.stringify(options));
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, [categoriesFromStorage.length]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label htmlFor={name}>Категория</label>
          <Select
            {...field}
            id={name}
            options={categories}
            onChange={(option) => field.onChange(option?.value)}
            onBlur={field.onBlur}
            value={categories.find((option) => option.value === field.value)}
            placeholder="Выберите категорию"
          />
          {/* {error && <p role="alert" className="text-danger">{error.message}</p>} */}
        </div>
      )}
      rules={{ required: "Выберите категорию" }}
    />
  );
};

export default CategorySelect;