"use client";

import { SessionInterface } from "@/common.types";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import { isSharedArrayBuffer } from "util/types";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({ type, session }: ProjectFormProps ) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { token } = await fetchToken();
    try {
      if (type === "create") {
        // create
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: ""
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flexStart form'
    >
      <div className='flexStart form_image-container'>
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.image && "Choose poster for project"}
          <input
            id="image"
            type="file"
            accept="image/*"
            required={type==="create"}
            className="form_image-input"
            onChange={handleChangeImage}
          />
          {form.image && (
            <Image
              src={form?.image}
              className="sm:p-10 object-contain z-20"
              alt="Project Poster"
              fill
            />
          )}
        </label>
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexible"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Flexible"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="Flexible"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="Flexible"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            submitting ?
              `${type === "create" ? "Creating" : "Editing"}` :
              `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          isSubmitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
