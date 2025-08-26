export const validateSubagentForm = (data: {
  name: string;
  description: string;
  type: string;
  tools: string[];
}) => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!data.type.trim()) {
    errors.type = 'Type is required';
  }

  if (!data.tools.length) {
    errors.tools = 'At least one tool must be selected';
  }

  return errors;
};