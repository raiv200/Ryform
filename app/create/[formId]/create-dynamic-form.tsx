"use client";

import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { handleCreateTable } from "@/db/create-new-table";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormSchema = {
  id: string;
  type: string;
  label: string;
  primaryKey?: boolean;
};

const INPUT_BLOCK_ELEMENTS = [
  {
    type: "text",
    label: "Short Answer",
    icon: "shortText",
  },
  {
    type: "textarea",
    label: "Long Answer",
    icon: "longText",
  },
  {
    type: "email",
    label: "Email",
    icon: "email",
  },
  {
    type: "date",
    label: "Date Picker",
    icon: "date",
  },
  {
    type: "time",
    label: "Time",
    icon: "time",
  },
  {
    type: "number",
    label: "Number",
    icon: "number",
  },
  {
    type: "tel",
    label: "Phone Number",
    icon: "phone",
  },
  {
    type: "url",
    label: "Link",
    icon: "link",
  },
];

export default function CreateDynamicForm({ formId, session }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [formSchema, setFormSchema] = useState<FormSchema[]>([]);
  const [formTitle, setFormTitle] = useState("");
  const [elementType, setElementType] = useState("text");
  const [selectedBox, setSelectedBox] = useState(null);
  const [creatingForm, setCreatingForm] = useState(false);

  const addFormElement = () => {
    // Determine the schema structure based on the element type
    let newElement;
    if (
      elementType === "text" ||
      elementType === "textarea" ||
      elementType === "email" ||
      elementType === "date" ||
      elementType === "time" ||
      elementType === "number" ||
      elementType === "tel" ||
      elementType === "url"
    ) {
      newElement = {
        id: nanoid(10), // Unique identifier for the element
        type: elementType,
        label: "",
      };
    }

    // console.log(newElement)
    console.log(`Selected Element Type: ${elementType}`);
    setSelectedBox(null);
    setFormSchema([...formSchema, newElement]);
  };

  const handleLabelChange = (id, newLabel) => {
    // Update the label of a form element
    const updatedSchema = formSchema.map((element) =>
      element.id === id ? { ...element, label: newLabel } : element
    );
    setFormSchema(updatedSchema);
  };

  const removeFormElement = (id) => {
    // Remove a form element by its unique identifier
    const updatedSchema = formSchema.filter((element) => element.id !== id);
    setFormSchema(updatedSchema);
  };

  const handleFormTitle = (e) => {
    setFormTitle(e.target.value);
  };

  const handlePublish = async () => {
    setCreatingForm(true);
    // Save the entire form schema with the formId to your database
    const completeFormSchema = {
      user_id: session?.user?.id,
      formId,
      formTitle,
      schema: [
        {
          id: nanoid(10),
          type: "uuid",
          label: "id",
          primaryKey: true,
        },
        ...formSchema,
      ],
    };

    // You need to implement database integration here

    // Save `completeForm` to your database

    const schemaForUserForm = formSchema?.map((field) => ({
      ...field,
      label: field.label.toLowerCase(),
    }));

    const { error } = await supabase.from("formSchema").insert({
      user_id: session?.user?.id,
      formId: formId,
      formTitle: formTitle,
      schema: JSON.stringify(schemaForUserForm),
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Complete Form Schema:", completeFormSchema);
    }

    // After the submission of the Form Scehma, Creating the table in the database with that
    // form schema to store the user form submission data

    const formSchemaForCreatingTable = {
      formId: completeFormSchema.formId, // Table Name will be based on FormId
      schema: completeFormSchema.schema,
    };
    const newGeneratedTableData = await handleCreateTable(
      formSchemaForCreatingTable
    );

    console.log(
      "Data Result after fetch POST form Pubmish Button ---> ",
      newGeneratedTableData
    );
    setCreatingForm(false);

    toast({
      variant:"success",
      title: "Form Published!!",
      description: "Congrats 🎉 You just created a New Form",
    });

    router.push("/");
  };

  const handleBoxClick = (selectedType, index) => {
    setElementType(selectedType);
    setSelectedBox(index);
  };

  // const handleInsertClick = () => {
  //   console.log(`Selected Element Type: ${elementType}`);
  //   setSelectedBox(null);
  // };

  return (
    <div className="  p-4 w-full overflow-x-hidden sm:min-w-5xl sm:w-full ">
      <div className=" flex items-center justify-between px-2 mb-4">
        <p className=" text-muted-foreground">My FormId: {formId}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" className="absolute top-4 right-2">
              Publish
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Are you ready to publish your
                form.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlePublish}>
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <input
        className="bg-transparent relative shadow-none cursor-text border-none placeholder:text-muted-foreground caret-muted-foreground text-4xl p-2 text-accent-foreground font-bold border border-transparent focus:border-transparent  focus:outline-none"
        autoFocus={true}
        value={formTitle}
        placeholder="Form Title"
        onChange={handleFormTitle}
      />

      <div className="mt-4">
        {/* Render the list of form elements and labels */}
        {formSchema.map((element) => (
          <div key={element.id} className=" relative flex mb-4 ">
            <div className=" flex flex-col space-y-4 w-[280px] sm:w-[380px] md:w-full sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 ">
              {/* Rendering form elements based on the schema */}

              <Input
                type="text"
                placeholder="Add Label"
                value={element.label}
                onChange={(e) => handleLabelChange(element.id, e.target.value)}
                
              />

              {element.type === "text" && (
                <Input type="text" placeholder="Your Text" />
              )}
              {element.type === "email" && (
                <Input type="email" placeholder="Your Email" />
              )}
              {element.type === "textarea" && (
                <Textarea placeholder="You TextArea"></Textarea>
              )}
              {element.type === "date" && (
                <Input type="date" placeholder="Choose Date" />
              )}
              {element.type === "time" && (
                <Input type="time" placeholder="Select Time" />
              )}
              {element.type === "number" && (
                <Input type="number" placeholder="Choose Number" />
              )}
              {element.type === "tel" && (
                <Input type="tel" placeholder="Enter Phone Number" />
              )}

              {element.type === "url" && (
                <Input type="url" placeholder="Paste Url" />
              )}

              <Button
                onClick={() => removeFormElement(element.id)}
                variant="ghost"
                size="icon"
                className=" absolute -top-2 right-0  sm:flex sm:relative  group  hover:bg-primary "
              >
                <Icons.trash className="h-4 w-4 md:h-5 md:w-5 text-rose-600 group-hover:text-white  dark:group-hover:text-rose-600 " />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="">
            <Icons.add className=" h-4 w-4 mr-2" strokeWidth={3} />
            Add New Element
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[325px] sm:max-w-[375px] md:min-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Insert Input Blocks
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 place-items-center w-full py-6 ">
            {INPUT_BLOCK_ELEMENTS.map(({ type, label, icon }, index) => (
              <div
                key={type}
                className={`input-block ${
                  selectedBox === index
                    ? "border-foreground bg-muted text-accent-foreground "
                    : "hover:border-muted-foreground"
                }`}
                onClick={() => handleBoxClick(type, index)}
              >
                {icon === "shortText" && (
                  <Icons.shortText className="flex items-center justify-center w-5 h-5" />
                )}
                {icon === "longText" && (
                  <Icons.longText className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "email" && (
                  <Icons.email className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "date" && (
                  <Icons.date className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "time" && (
                  <Icons.time className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "number" && (
                  <Icons.number className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "phone" && (
                  <Icons.phone className="flex items-center justify-center w-4 h-4" />
                )}
                {icon === "link" && (
                  <Icons.link className="flex items-center justify-center w-4 h-4" />
                )}

                <p>{label}</p>
              </div>
            ))}
          </div>

          <DialogTrigger asChild>
            <Button onClick={addFormElement}>
              Insert Element
              <Icons.arrowRight className=" h-4 w-4 ml-2" strokeWidth={3} />
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
}
