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
import {
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
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
  const supabase = createClientComponentClient();

  const [formSchema, setFormSchema] = useState<FormSchema[]>([]);
  const [formTitle, setFormTitle] = useState("");
  const [elementType, setElementType] = useState("text");
  const [selectedBox, setSelectedBox] = useState(null);

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
        id: Date.now(), // Unique identifier for the element
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
    // Save the entire form schema with the formId to your database
    const completeFormSchema = {
      user_id: session?.user?.id,
      formId,
      formTitle,
      schema: [
        {
          id: 121212,
          type: "uuid",
          label: "id",
          primaryKey: true,
        },
        ...formSchema,
      ],
    };

    // You need to implement database integration here

    // Save `completeForm` to your database

    const { error } = await supabase
      .from('formSchema')
      .insert({
        user_id:session?.user?.id,
        formId:formId,
        formTitle:formTitle,
        schema:[
          {
            id: 121212,
            type: "uuid",
            label: "id",
            primaryKey: true,
          },
          ...formSchema
        ]
      });

    if (error) {
      console.log(error);
    } else {
      console.log("Complete Form Schema:", completeFormSchema);
    }
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
    <div className=" text-white p-4 min-w-5xl w-full border-2">
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
        className="bg-transparent relative cursor-text border-none placeholder:text-muted-foreground caret-muted-foreground text-4xl p-2 text-accent-foreground font-bold border border-transparent focus:border-transparent focus:outline-none"
        autoFocus={true}
        value={formTitle}
        placeholder="Form Title"
        onChange={handleFormTitle}
      />

      <div className="mt-4">
        {/* Render the list of form elements and labels */}
        {formSchema.map((element) => (
          <div key={element.id} className="mb-4">
            <div className="flex items-center">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => removeFormElement(element.id)}
              >
                Delete
              </button>
              {/* Rendering form elements based on the schema */}
              {element.type === "text" && (
                <input
                  type="text"
                  placeholder="Your Text"
                  className="border border-gray-400 bg-gray-800 text-white p-2 rounded ml-2"
                />
              )}
              {element.type === "email" && (
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-gray-400 bg-gray-800 text-white p-2 rounded ml-2"
                />
              )}
              {element.type === "textarea" && (
                <textarea
                  placeholder="You TextArea"
                  className="border border-gray-400 bg-gray-800 text-white p-2 rounded ml-2"
                ></textarea>
              )}

             
            </div>
            <input
              type="text"
              placeholder="Label"
              value={element.label}
              onChange={(e) => handleLabelChange(element.id, e.target.value)}
              className="border border-gray-400 bg-gray-800 text-white p-2 rounded mt-2 ml-2"
            />
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Icons.add className=" h-4 w-4 mr-2" strokeWidth={3} />
            Add New Element
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[325px] md:min-w-[450px]">
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
