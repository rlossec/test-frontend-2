import { useState, type FormEvent } from "react";

import type { Tool } from "../../types/entities/tool";
import { TOOL_CATEGORIES } from "../../types/entities/tool";
import { DEPARTMENTS } from "../../types/entities/department";

import { FormField } from "../common/forms/simple/FormField";
import { Input } from "../common/forms/simple/Input";
import { Select } from "../common/forms/simple/Select";
import { TextArea } from "../common/forms/simple/TextArea";
import { StatusSelector } from "./StatusSelector";
import { Button } from "../common/base/buttons/Button";

type ToolFormValues = {
  name: string;
  description: string;
  vendor: string;
  category: Tool["category"];
  owner_department: string;
  website_url: string;
  icon_url: string;
  status: Tool["status"];
  monthly_cost: number;
};

interface ToolFormProps {
  initialValues?: Partial<Tool>;
  onSubmit: (values: ToolFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const buildInitialValues = (initialValues?: Partial<Tool>): ToolFormValues => ({
  name: initialValues?.name ?? "",
  description: initialValues?.description ?? "",
  vendor: initialValues?.vendor ?? "",
  category: initialValues?.category ?? TOOL_CATEGORIES[0],
  owner_department: initialValues?.owner_department ?? "",
  website_url: initialValues?.website_url ?? "",
  icon_url: initialValues?.icon_url ?? "",
  status: initialValues?.status ?? "unused",
  monthly_cost: initialValues?.monthly_cost ?? 0,
});

export const ToolForm = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Enregistrer",
}: ToolFormProps) => {
  const [values, setValues] = useState<ToolFormValues>(
    buildInitialValues(initialValues)
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ToolFormValues, string>>
  >({});

  const handleChange =
    <K extends keyof ToolFormValues>(field: K) =>
    (value: ToolFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleInputChange =
    <K extends keyof ToolFormValues>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const targetValue = e.target.value;
      // Pour monthly_cost, convertir en number
      if (field === "monthly_cost") {
        const numValue = parseFloat(targetValue) || 0;
        handleChange(field)(numValue as ToolFormValues[K]);
      } else {
        // @ts-expect-error - string cast is safe here
        handleChange(field)(targetValue);
      }
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ToolFormValues, string>> = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!values.category) {
      newErrors.category = "Category is required.";
    }
    if (!values.owner_department) {
      newErrors.owner_department = "Department is required.";
    }
    if (!values.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Name" required error={errors.name}>
          <Input
            name="name"
            value={values.name}
            onChange={handleInputChange("name")}
            placeholder="e.g. Slack, Jira..."
          />
        </FormField>

        <FormField label="Vendor" error={errors.vendor}>
          <Input
            name="vendor"
            value={values.vendor}
            onChange={handleInputChange("vendor")}
            placeholder="e.g. Atlassian"
          />
        </FormField>
      </div>

      <FormField
        label="Description"
        helperText="Briefly describe the usage of this tool."
      >
        <TextArea
          name="description"
          value={values.description}
          onChange={handleInputChange("description")}
          rows={4}
          placeholder="Tool description..."
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Category" required error={errors.category}>
          <Select
            value={values.category}
            onChange={(value) =>
              handleChange("category")(value as Tool["category"])
            }
            options={TOOL_CATEGORIES.map((category) => ({
              value: category,
              label: category,
            }))}
            placeholder="Select a category"
          />
        </FormField>

        <FormField
          label="Owner Department"
          required
          error={errors.owner_department}
        >
          <Select
            value={values.owner_department}
            onChange={(value) => handleChange("owner_department")(value)}
            options={DEPARTMENTS.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            placeholder="Select a department"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Status"
          helperText="Select the tool status"
          error={errors.status}
        >
          <StatusSelector
            value={values.status ?? "unused"}
            onChange={(value) =>
              handleChange("status")(value as Tool["status"])
            }
          />
        </FormField>

        <FormField label="Monthly Cost (€)" error={errors.monthly_cost}>
          <Input
            name="monthly_cost"
            type="number"
            min="0"
            step="0.01"
            value={values.monthly_cost.toString()}
            onChange={handleInputChange("monthly_cost")}
            placeholder="0.00"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Website URL">
          <Input
            name="website_url"
            type="url"
            value={values.website_url}
            onChange={handleInputChange("website_url")}
            placeholder="https://..."
          />
        </FormField>

        <FormField label="Icon URL">
          <Input
            name="icon_url"
            type="url"
            value={values.icon_url}
            onChange={handleInputChange("icon_url")}
            placeholder="https://example.com/icon.png"
          />
        </FormField>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          color="primary"
          variant="solid"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
