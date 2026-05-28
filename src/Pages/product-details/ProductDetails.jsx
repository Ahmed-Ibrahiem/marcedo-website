import { useEffect, useState } from "react";
import { getProductDetails } from "../../services/productDetailsServices";

const ProductDetails = ({ productData }) => {
  const [currentContent, setCurrentContent] = useState("description");
  const [productDetails, setProductDetails] = useState(null);

  const tabs = ["description", "delivery policy", "shipping & return"];

  useEffect(() => {
    if (!productData) return;

    const getDetails = async () => {
      const details = await getProductDetails(productData.id);
      if (!details) return;
      setProductDetails(details);
    };

    getDetails();
  }, [productData]);

  return (
    <div className="mt-30 px-5 lg:px-0 min-h-90">
      {/* Start Tabs */}
      <div className="tabs flex-start gap-5 md:gap-10 md:text-xl font-bold capitalize">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`hover:text-orange ${currentContent === tab ? "text-orange" : ""}`}
            onClick={() => setCurrentContent(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Start Content */}
      <div className="text-sm! mt-5">
        {currentContent === "description" && (
          <div className="flex-start-col gap-2.5 text-gray fade-in-animate">
            {productDetails?.description?.map((dt, index) => {
              // pragraph
              if (dt.type === "paragraph")
                return (
                  <p key={index} className="leading-6">
                    {dt.content}
                  </p>
                );
              if (dt.type === "heading")
                return (
                  <h2 key={index} className="text-lg! font-bold">
                    {dt.content}
                  </h2>
                );
              if (dt.type === "list")
                return (
                  <ol
                    key={index}
                    className="flex-start-col gap-2 list-disc pl-7.5"
                  >
                    {dt.items.map((list, index) => {
                      return (
                        <li key={index + 4} className="text-sm text-gray">
                          {list}
                        </li>
                      );
                    })}
                  </ol>
                );
            })}
          </div>
        )}

        {currentContent === "delivery policy" && (
          <p className="leading-7 fade-in-animate text-gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo harum
            quis natus aliquam blanditiis ea cupiditate illum laborum ipsum
            eveniet? Suscipit temporibus provident dolor dolorem eveniet iste
            rerum distinctio commodi cupiditate, et cumque ea quae sed, at
            sequi? Quaerat, unde nulla sit consequatur quisquam saepe? Libero
            mollitia fugit adipisci optio minima laudantium error saepe, aut
            reprehenderit, quo ducimus nam blanditiis fugiat consequuntur
            repudiandae ad ratione unde at architecto nobis doloribus. Dolorum
            libero asperiores, dicta excepturi laboriosam eius, id impedit ad
            consequuntur tempora corporis fugiat minima adipisci expedita a
            illum laborum. Dolor alias quia iure quae laborum necessitatibus
            libero beatae vero suscipit. Voluptas doloribus velit quod ducimus
            iusto adipisci. Cum, cupiditate iure, aspernatur totam incidunt
            sapiente expedita facilis amet architecto est repellendus fuga
            aliquam eligendi minus placeat tenetur sed consequuntur vitae! Error
            deserunt cupiditate itaque perspiciatis commodi ab. Iusto
            distinctio, blanditiis delectus, suscipit, amet ratione aliquid hic
            minima tenetur excepturi dolore?
          </p>
        )}

        {currentContent === "shipping & return" && (
          <div className="flex-start-col gap-2.5 ">
            <p className="leading-6 text-gray">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam quod
              excepturi temporibus quis fugiat, molestiae ipsa in?
              Necessitatibus labore quo nihil voluptatum molestias deserunt
              veniam natus minus magni, facilis magnam?
            </p>
            <p className="leading-6 text-gray">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam quod
              excepturi temporibus quis fugiat, molestiae ipsa in?
              Necessitatibus labore quo nihil voluptatum molestias deserunt
              veniam natus minus magni, facilis magnam?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
