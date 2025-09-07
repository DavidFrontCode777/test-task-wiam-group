import { Controller, Control, FieldValues, Path } from "react-hook-form";

type RangeSliderProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string; // например "дней" или "$"
};

export default function RangeSlider<T extends FieldValues>({
  control,
  name,
  label,
  min,
  max,
  step,
  unit,
}: RangeSliderProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value, ref } }) => (
        <div>
          <label htmlFor={name}>
            {label}: {value} {unit}
          </label>
          <input
            id={name}
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={Number(value)}
            className="form-range w-100"
          />
        </div>
      )}
    />
  );
}