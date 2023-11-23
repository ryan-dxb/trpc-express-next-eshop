import InputWithLabel from "@/components/dashboard/common/InputWithLabel";
import PageContentLayout from "@/components/dashboard/common/PageContentLayout";
import PageHeader from "@/components/dashboard/common/PageHeader";
import { NextPage } from "next";
import { Input, Label } from "ui";

interface AddNewProductPageProps {}

const AddNewProductPage: NextPage<AddNewProductPageProps> = () => {
  return (
    <>
      <PageHeader
        title="Add New Product"
        subTitle="Add new product to your store"
      />
      <PageContentLayout>
        <div className="grid grid-cols-3 gap-x-8">
          <div className="col-span-2">
            <div className="w-full p-4 border">
              <h3 className="text-lg font-semibold">Product Information</h3>
              <form action="" className="flex flex-col gap-6 mt-6">
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

                {/* Product Images */}
              </form>
            </div>
          </div>

          <div className="col-span-1">
            <div className="w-full p-4 border">
              <h3 className="text-lg font-semibold">Pricing</h3>
            </div>
          </div>
        </div>
      </PageContentLayout>
    </>
  );
};

export default AddNewProductPage;
