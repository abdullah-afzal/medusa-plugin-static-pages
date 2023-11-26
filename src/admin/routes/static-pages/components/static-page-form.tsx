import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  Path,
  FieldErrorsImpl,
} from "react-hook-form";
import { Label, Input, Button, Toaster, useToast } from "@medusajs/ui";
import { Spinner } from "@medusajs/icons";
import GrapeEditor from "./grape-editor";
import { useAdminCustomPost } from "medusa-react";
import { Page } from "../../../../models/page";
import { Link, useNavigate, useParams } from "react-router-dom";


type Inputs = {
  title: string;
  handle: string;
  metadata?: string;
};

type FormInput = {
  name: keyof Inputs;
  label: string;
  placeholder?: string;
  required?: boolean;
};

const formInputs: FormInput[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Winter Jacket",
    required: true,
  },
  {
    name: "handle",
    label: "Handle",
    placeholder: "winter-jacket",
    required: true,
  },
  {
    name: "metadata",
    label: "Metadata",
    placeholder: "100% cotton",
    required: false,
  },
];

export default function StaticPageForm({
  type,
  defaultValues,
}: {
  type: "create" | "update";
  defaultValues?: Page;
}) {

  const { identifier } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutatePages({
    path:
      type === "create"
        ? "pages/"
        : `pages/${identifier}/update`,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      handle: defaultValues?.handle ?? "",
      title: defaultValues?.title ?? "",
      metadata: defaultValues?.metadata ?? "",
    },
  });
  const { toast } = useToast();
  const [code, setCode] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      { ...data, body: code },
      {
        onSuccess: ({ identifier,message }) => {
          toast({
            title: "Success",
            description: message,
            variant: "success",
          });
          navigate(`/a/static-pages/${identifier}`);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        {formInputs.map(({ name, label, placeholder, required }) => (
          <FormInput
            key={name}
            name={name}
            label={label}
            placeholder={placeholder}
            register={register}
            required={required}
            errors={errors}
          />
        ))}
        <GrapeEditor setCode={setCode} code={defaultValues?.body} />
        <div className="flex justify-end gap-x-4">
          <Link to="/a/static-pages">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            {isLoading && <Spinner className="animate-spin" />} Save
          </Button>
        </div>
      </form>
    </>
  );
}

function FormInput<T>({
  name,
  label,
  register,
  errors,
  required,
  placeholder,
}: {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors?: Partial<FieldErrorsImpl<T>>;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <div>
      <Label size="small" weight="plus">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        placeholder={placeholder}
        className="mt-1"
        {...register(name, { required })}
        aria-invalid={!!errors?.[name as string]}
      />
      {errors?.[name as string] && (
        <span className="text-xs text-red-500">This field is required</span>
      )}
    </div>
  );
}

export function useMutatePages({
  path,
  queryKey,
  query,
}: {
  path: string;
  queryKey?: any[];
  query?: Page;
}) {
  const res = useAdminCustomPost<
    Inputs & { identifier?: string; body: string },
    { identifier:string,message: string }
  >(path, [path.split("/").join("-"), ...(queryKey ? queryKey : [])]);

  return res;
}
