"use client";

import InputWithLabel from "@/components/dashboard/common/InputWithLabel";
import PageContentLayout from "@/components/dashboard/common/PageContentLayout";
import PageHeader from "@/components/dashboard/common/PageHeader";
import RichTextEditor from "@/components/dashboard/common/richTextEditor";
import { NextPage } from "next";
import Image from "next/image";
import { Button, Checkbox, Input, Label, Separator, Switch } from "ui";
import ImageUpload from "@/components/dashboard/common/ImageUpload";
import CategoryDropDown from "@/components/dashboard/common/CategoryDropDown";
import TagInput from "@/components/dashboard/common/TagInput";
import { useState } from "react";

interface AddNewProductPageProps {}

type CheckedState = boolean | "indeterminate";

const AddNewProductPage: NextPage<AddNewProductPageProps> = () => {
  const [taxable, setTaxable] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const onTaxChange = (e: CheckedState) => {
    setTaxable(e.valueOf() as boolean);
  };

  console.log(inStock);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Add New Product"
        subTitle="Add new product to your store"
      />
      <PageContentLayout>
        <form>
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-2">
              <div className="w-full p-4 border">
                <h3 className="text-lg font-semibold">Product Information</h3>
                <div className="flex flex-col gap-6 mt-6">
                  <InputWithLabel
                    name="name"
                    label="Product Name"
                    placeholder="Enter product name"
                  />

                  <div className="flex flex-row space-x-8 ">
                    <InputWithLabel
                      label="SKU"
                      name="sku"
                      placeholder="Enter product SKU"
                    />
                    <InputWithLabel
                      label="Product Id"
                      name="productId"
                      placeholder="Enter product id"
                    />
                  </div>

                  <InputWithLabel
                    type="textarea"
                    label="Short Description"
                    name="shortDescription"
                    placeholder="Describe your product in a few words"
                  />

                  {/* Text Editor for Long Description */}

                  <div>
                    <Label
                      htmlFor="longDescription"
                      className="text-xs font-medium uppercase text-muted-foreground"
                    >
                      Product Description
                    </Label>
                    <RichTextEditor />
                  </div>

                  {/* Product Images */}
                  <div>
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Product Images
                    </Label>

                    <ImageUpload />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="w-full p-4 border">
                <h3 className="text-lg font-semibold">Pricing</h3>

                <div className="flex flex-col gap-6 mt-6">
                  <InputWithLabel
                    label="Base Price"
                    name="basePrice"
                    placeholder="Enter product base price"
                  />

                  <InputWithLabel
                    label="Discounted Price"
                    name="discountedPrice"
                    placeholder=" Enter product discounted price"
                  />

                  <Separator />

                  <div className="flex flex-row justify-between">
                    <Label
                      htmlFor="taxable"
                      className="text-xs font-medium uppercase text-muted-foreground"
                    >
                      Is product taxable?
                    </Label>
                    <Checkbox
                      id="taxable"
                      className="rounded"
                      checked={taxable}
                      onCheckedChange={(e) => onTaxChange(e)}
                    />
                  </div>

                  {taxable && (
                    <div className="flex flex-row items-center gap-2 p-4 border">
                      <InputWithLabel
                        label="Tax Name"
                        name="taxName"
                        placeholder="Enter product tax name"
                      />
                      <InputWithLabel
                        label="Rate (%)"
                        name="taxRate"
                        placeholder="Enter product tax rate"
                      />
                    </div>
                  )}

                  <Separator />
                  <div className="flex flex-row justify-between">
                    <Label
                      htmlFor="in-stock"
                      className="text-xs font-medium uppercase text-muted-foreground"
                    >
                      In Stock
                    </Label>
                    <Switch
                      className=""
                      id="in-stock"
                      checked={inStock}
                      onCheckedChange={(e) =>
                        setInStock(e.valueOf() as boolean)
                      }
                    />
                  </div>
                  {inStock && (
                    <div className="flex flex-row items-center justify-between p-4 border">
                      <Label
                        htmlFor="stock-quantity"
                        className="text-xs font-medium uppercase text-muted-foreground"
                      >
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock-quantity"
                        type="number"
                        placeholder="Enter stock quantity"
                        className="w-20 focus-visible:ring-offset-0 active:ring-offset-0 focus:ring-offset-0"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full p-4 mt-4 border">
                <h3 className="text-lg font-semibold">Product Organization</h3>

                <div className="mt-6">
                  <div className="flex flex-col space-y-6">
                    <CategoryDropDown />
                    <TagInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </PageContentLayout>
    </div>
  );
};

export default AddNewProductPage;
