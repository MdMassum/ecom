import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";


function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchKey: "",
    category: "all",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const limit = 3;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "searchKey" || id === "category") {
      setSideBarData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("category", sideBarData.category);
    urlParams.set("searchKey", sideBarData.searchKey);
    urlParams.set("page", "1");
    urlParams.set("limit", limit.toString());

    navigate(`/search?${urlParams.toString()}`);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const urlParams = new URLSearchParams(location.search);
      if (!urlParams.get("limit")) urlParams.set("limit", limit.toString());

      const resp = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/products?${urlParams}`
      );
      const data = await resp.json();

      setProducts(data?.products || []);
      setTotalPages(data?.totalPages || 1);
      setCurrentPage(data?.currentPage || 1);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (pageNum) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", pageNum.toString());
    urlParams.set("limit", limit.toString());
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchKeyFromUrl = urlParams.get("searchKey");
    const categoryFromUrl = urlParams.get("category");

    if (searchKeyFromUrl || categoryFromUrl) {
      setSideBarData({
        searchKey: searchKeyFromUrl || "",
        category: categoryFromUrl || "",
      });
    }

    fetchProducts();
  }, [location.search]);

  return (
    <div className="w-screen mt-20 min-h-96">
      <div className="flex flex-col md:flex-row ">
        {/* Sidebar */}
        <div className="p-8 md:border-r-2 md:min-h-screen md:w-[360px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-xl">Search Word: </label>
              <input
                type="text"
                id="searchKey"
                placeholder="Search.."
                className="border p-3 w-full rounded-lg"
                value={sideBarData.searchKey}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label className="font-semibold">Category</label>
              <select
                id="category"
                className="rounded-lg border p-3 w-full"
                onChange={handleChange}
                value={sideBarData.category}
              >
                <option value="all">All</option>
                <option value="Pottery">Pottery</option>
                <option value="Wooden">Wooden</option>
                <option value="Mettalic">Mettalic</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-1/2 bg-slate-700 rounded-lg p-3 uppercase text-white hover:opacity-90"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setSideBarData({ searchKey: "", category: "all" });
                  navigate(
                    `/search?category=all&searchKey=&page=1&limit=${limit}`
                  );
                }}
                className="w-1/2 bg-red-600 rounded-lg p-3 uppercase text-white hover:opacity-90"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="flex-1 px-7 py-4">
          <h1 className="text-3xl font-semibold border-b px-3 py-1 mb-6 text-blue-900 ">
            Product results:
          </h1>
          <div className="flex flex-wrap gap-8">
            {!loading && products.length === 0 && (
              <p className="text-xl text-slate-700 m-auto dark:text-gray-400">
                {" "}
                No Product Found !!
              </p>
            )}
            {loading && <Loader/>}
            {!loading &&
              products.length > 0 &&
              products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <ProductCard product={product} />
                </Link>
              ))}
          </div>

          {/* pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-end mt-16 gap-2 flex-wrap items-center">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 border rounded-md transition-all duration-300 cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 w-24 border rounded-md transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
