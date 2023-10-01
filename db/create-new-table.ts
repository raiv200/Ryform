interface FormField {
  id: number;
  type: string;
  label: string;
  primaryKey?: boolean;
}

interface FormSchema {
  formId: string;
  schema: FormField[];
}

interface SupabaseColumn {
  name: string;
  type: string;
  primaryKey?: boolean;
}

interface SupabaseTableSchema {
  tableName: string;
  columns: SupabaseColumn[];
}

function mapFieldTypeToSupabaseType(fieldType: string): string {
  switch (fieldType) {
    case "text":
    case "email":
    case "textarea":
      return "text";
    case "date":
      return "timestampz";
    case "number":
      return "integer";
    case "tel":
      return "text"; //  'text' for phone numbers
    case "url":
      return "text"; //  'text' for URLs
    case "time":
      return "time";
    case "uuid":
      return "uuid";
    default:
      return "text"; // Default to 'text' for unsupported types
  }
}

function generateSupabaseSchema(formSchema: FormSchema): SupabaseTableSchema {
  const tableSchema: SupabaseTableSchema = {
    tableName: `form_table_${formSchema.formId}`,
    columns: [],
  };

  formSchema.schema.forEach((field) => {
    const column: SupabaseColumn = {
      name: `${field.label.toLowerCase().replace(/ /g, '_')}`,
      type: mapFieldTypeToSupabaseType(field.type),
    };

    if (field.primaryKey) {
      column.primaryKey = true;
    }

    tableSchema.columns.push(column);
  });

  return tableSchema;
}

// Example usage:

export const handleCreateTable = async (formSchema) => {
  const supabaseSchema: SupabaseTableSchema =
    generateSupabaseSchema(formSchema);
  console.log(supabaseSchema);

  //   const tableName = "users_forms";
  //   const schema = [
  //     { name: "id", type: "uuid", primaryKey: true },
  //     { name: "name", type: "TEXT" },
  //     { name: "age", type: "INTEGER" },
  //   ];

  const requestBody = {
    tableName: supabaseSchema.tableName,
    schema: supabaseSchema.columns,
  };

  const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://ryform.vercel.app';

  const data = await fetch(`${baseUrl}/api/create-table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return data;
};
