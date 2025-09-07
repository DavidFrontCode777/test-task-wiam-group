import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { IMaskInput } from "react-imask";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
};

function formatMaskedFromDigits(digits: string) {
  let d = digits.replace(/\D/g, "");
  if (!d.startsWith("0")) d = "0" + d;
  d = d.slice(0, 10);
  const p1 = d.slice(0, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 10);
  let out = p1;
  if (p2) out += " " + p2;
  if (p3) out += " " + p3;
  return out;
}

export default function PhoneInputRHForm<T extends FieldValues>({
  control,
  name,
  required = true,
}: Props<T>) {
  return (
    <div>
      <label htmlFor={name}>Телефон</label>

      <Controller
        name={name}
        control={control}
        defaultValue={"0" as any}
        rules={{
          required: required ? "Номер обязателен" : false,
          pattern: {
            value: /^0\d{3} \d{3} \d{3}$/,
            message: "Номер должен быть в формате 0XXX XXX XXX",
          },
        }}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
          const handleAccept = (val: string) => {
            const digits = val.replace(/\D/g, "");
            const formatted = formatMaskedFromDigits(digits);
            if (formatted !== val) {
              onChange(formatted);
            } else {
              onChange(val);
            }
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            const el = e.currentTarget;
            const start = el.selectionStart ?? 0;
            const end = el.selectionEnd ?? 0;

            if (e.key === "Backspace") {
              if (start <= 1 && end <= 1) {
                e.preventDefault();
                el.setSelectionRange(1, 1);
              }
            }

            if (e.key === "Delete") {
              if (start === 0) {
                e.preventDefault();
                el.setSelectionRange(1, 1);
              }
            }
          };

          const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            const el = e.currentTarget;
            setTimeout(() => {
              if ((el.selectionStart ?? 0) <= 0) {
                try {
                  el.setSelectionRange(1, 1);
                } catch {}
              }
            }, 0);
          };

          return (
            <>
              <IMaskInput
                id={name}
                inputRef={ref}
                mask="{0}000 000 000"
                value={(value as string) ?? "0"}
                onAccept={(val: string) => handleAccept(val)}
                type="text"
                inputMode="tel"
                placeholder="0XXX XXX XXX"
                required={required}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
              />
              {error ? <p role="alert" className="text-danger">{error.message}</p> : null}
            </>
          );
        }}
      />
    </div>
  );
}