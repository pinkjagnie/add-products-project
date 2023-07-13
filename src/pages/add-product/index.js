import React from "react";

import AddProductForm from "@/components/AddProductForm";

const addProductPage = () => {
  return (
    <section className="pt-22">
      <h1 className="text-center font-bold text-xl uppercase pb-6">
        To add product please fill in the form
      </h1>
      <AddProductForm />
    </section>
  );
};

export default addProductPage;
