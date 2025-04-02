import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DataContent from "../components/DataContent";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/product/${params.id}`,
          { withCredentials: true }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data.product);
        setMainImage(data.product.images[0]); // Set first image as main image
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <main className="w-full mt-20 md:mt-24 min-h-96">
      {loading && <p className="text-center mt-28 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center mt-28 text-2xl">Something went wrong!</p>
      )}
      {product && !loading && !error && (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto md:p-3 md:my-7 gap-8">
          {/* Image Gallery */}
          <div className="hidden md:flex md:w-1/2 w-full flex-col gap-4 relative">
            {/* Large Image Display with Share Button Overlay */}
            <div className="h-[400px] border rounded-md relative">
              <div
                className="absolute top-4 right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
                onClick={handleShare}
              >
                <FaShare className="text-slate-500" />
              </div>

              {copied && (
                <p className="absolute top-17 right-4 z-10 rounded-md bg-slate-100 p-2">
                  Link copied!
                </p>
              )}

              <img
                src={mainImage}
                alt="Main product"
                className="h-full w-full object-cover rounded-md"
              />
            </div>

            {/* Thumbnails for Desktop */}
            <div className="flex gap-2">
              {product.images.map((url) => (
                <div
                  key={url}
                  className={`h-[100px] w-[100px] cursor-pointer border rounded-md ${
                    mainImage === url ? "border-2 border-blue-500" : ""
                  }`}
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => setMainImage(url)}
                ></div>
              ))}
            </div>
          </div>

          {/* Swiper Slider for Mobile */}
          <div className="flex md:hidden">
            <Swiper
              className="w-full"
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
            >
              {product.images.map((url) => (
                <SwiperSlide key={url}>
                  <div className="relative h-[380px] w-full border rounded-md">
                    {/* Share Button for Mobile */}
                    <div
                      className="absolute top-4 right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
                      onClick={handleShare}
                    >
                      <FaShare className="text-slate-500" />
                    </div>

                    {/* 'Link copied!' Message */}
                    {copied && (
                      <p className="absolute top-16 right-4 z-10 rounded-md bg-slate-100 p-2">
                        Link copied!
                      </p>
                    )}

                    <div
                      className="h-full w-full"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <DataContent product={product}/>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;
