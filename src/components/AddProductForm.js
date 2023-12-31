import React from "react";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const AddProductForm = () => {
  const validation = Yup.object().shape({
    selectCheckbox: Yup.bool().oneOf([true], "Checkbox selection is required"),
  });
  const optionsForm = { resolver: yupResolver(validation) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stock: "",
      author: "",
      tags: "",
      thumbnail: "",
      images: "",
      selectCheckbox: false,
    },
  });

  async function onSubmit(data, e) {
    const isChecked = data.selectCheckbox;

    if (!isChecked) {
      alert(
        "Check if the form is filled in correctly! Did you remember to accept the terms of service?"
      );
      return;
    }

    // creating array of tags
    const stringToTagsArray = (enteredTags) => {
      if (enteredTags.includes(",")) {
        return enteredTags.split(", ");
      } else if (enteredTags.includes(" ")) {
        return enteredTags.split(" ");
      }
    };

    const tagsArray = stringToTagsArray(data.tags);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discountPercentage", data.discountPercentage);
    formData.append("stock", data.stock);
    formData.append("author", data.author);
    formData.append("tags", tagsArray);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("images", data.images[0]);

    await axios.post("/api/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    reset();
  }

  return (
    <section>
      <p className="pt-4 pb-2 text-xs text-center italic">
        * - required fields
      </p>

      <form
        className="w-[90%] md:w-[60%] p-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="pb-6">
          <label htmlFor="title" className="pl-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            className="w-[100%] border-b border-gray-900"
            {...register("title", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.title && (
            <p className="text-pink-900 italic">{errors.title.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="description" className="pl-2">
            Description *
          </label>
          <textarea
            id="description"
            rows="4"
            cols="20"
            className="w-[100%] border-b border-gray-900"
            {...register("description", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.description && (
            <p className="text-pink-900 italic">{errors.description.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="price" className="pl-2">
            Price *
          </label>
          <input
            type="number"
            id="price"
            className="w-[100%] border-b border-gray-900"
            {...register("price", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.price && (
            <p className="text-pink-900 italic">{errors.price.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="discountPercentage" className="pl-2">
            Discount (in %)
          </label>
          <input
            type="number"
            id="discountPercentage"
            className="w-[100%] border-b border-gray-900"
            {...register("discountPercentage", {
              required: {
                value: false,
              },
            })}
          />
          {errors.discountPercentage && (
            <p className="text-pink-900 italic">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="stock" className="pl-2">
            In stock *
          </label>
          <input
            type="number"
            id="stock"
            className="w-[100%] border-b border-gray-900"
            {...register("stock", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.stock && (
            <p className="text-pink-900 italic">{errors.stock.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="author" className="pl-2">
            Author *
          </label>
          <input
            type="text"
            id="author"
            className="w-[100%] border-b border-gray-900"
            {...register("author", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.author && (
            <p className="text-pink-900 italic">{errors.author.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="tags" className="pl-2">
            Tags *
          </label>
          <input
            type="text"
            id="tags"
            className="w-[100%] border-b border-gray-900"
            {...register("tags", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <p className="italic text-sm">Seperate each tag by a comma</p>
          {errors.tags && (
            <p className="text-pink-900 italic">{errors.tags.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="thumbnail" className="pl-2">
            Thumbnail *
          </label>
          <input
            type="file"
            id="thumbnail"
            accept=".xlsx,.xls,image/*"
            // multiple
            className="w-[100%] border-b border-gray-900"
            {...register("thumbnail", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.thumbnail && (
            <p className="text-pink-900 italic">{errors.thumbnail.message}</p>
          )}
        </div>

        <div className="pb-6">
          <label htmlFor="images" className="pl-2">
            Images *
          </label>
          <input
            type="file"
            id="images"
            accept=".xlsx,.xls,image/*"
            // multiple
            className="w-[100%] border-b border-gray-900"
            {...register("images", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.images && (
            <p className="text-pink-900 italic">{errors.images.message}</p>
          )}
        </div>

        {/* CHECKBOX */}
        <div className="pb-10">
          <input
            type="checkbox"
            name="selectCheckbox"
            id="selectCheckbox"
            {...register("selectCheckbox")}
          />
          <label htmlFor="selectCheckbox" className="pl-2">
            I accept the terms of service
          </label>
          {errors.selectCheckbox && (
            <p className="text-pink-900 italic">
              {errors.selectCheckbox.message}
            </p>
          )}
        </div>

        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="w-[80%] outline px-6 py-4 font-medium bg-gray-700 disabled:bg-gray-500 text-zinc-200 hover:bg-gray-600"
            disabled={!isDirty || !isValid}
          >
            Add this product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProductForm;
